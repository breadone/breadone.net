import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSecret } from "astro:env/server";

const defaultRegion = "ap-southeast-2";
// const requiredConfigKeys = ["S3_BUCKET_NAME", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"] as const;

let s3Client: S3Client | undefined;

function getS3Config() {
    const bucketName = getSecret("S3_BUCKET_NAME");
    const accessKeyId = getSecret("AWS_ACCESS_KEY_ID");
    const secretAccessKey = getSecret("AWS_SECRET_ACCESS_KEY");
    const region = getSecret("AWS_REGION") || defaultRegion;

    return {
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
    };
}

function getS3Client() {
    if (!s3Client) {
        const config = getS3Config();

        if (!config) {
            return undefined;
        }

        const { region, accessKeyId, secretAccessKey } = config;

        s3Client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }

    return s3Client;
}

export async function listAlbumObjectKeys(albumSlug: string) {
    const config = getS3Config();

    if (!config) {
        return [];
    }

    const { bucketName } = config;
    const s3Client = getS3Client();

    if (!s3Client) {
        return [];
    }

    const keys: string[] = [];
    let continuationToken: string | undefined;
    const prefix = `${albumSlug}/`;

    do {
        const response = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: prefix,
                ContinuationToken: continuationToken,
            })
        );

        for (const object of response.Contents ?? []) {
            if (object.Key && !object.Key.endsWith("/")) {
                keys.push(object.Key);
            }
        }

        continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    return keys.sort(sortS3KeysByFilename);
}

export async function getSignedS3ObjectUrl(key: string, expiresIn = 3600) {
    const config = getS3Config();

    if (!config) {
        throw new Error("S3 is not configured");
    }

    const { bucketName } = config;
    const s3Client = getS3Client();

    if (!s3Client) {
        throw new Error("S3 is not configured");
    }

    return getSignedUrl(
        s3Client,
        new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        }),
        { expiresIn }
    );
}

function sortS3KeysByFilename(leftKey: string, rightKey: string) {
    const leftName = leftKey.split("/").pop() ?? leftKey;
    const rightName = rightKey.split("/").pop() ?? rightKey;
    const leftNumber = Number.parseInt(leftName, 10);
    const rightNumber = Number.parseInt(rightName, 10);

    if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber) && leftNumber !== rightNumber) {
        return leftNumber - rightNumber;
    }

    return leftName.localeCompare(rightName, undefined, { numeric: true, sensitivity: "base" });
}