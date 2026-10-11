import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = import.meta.env.AWS_REGION || "ap-southeast-2";

function getBucketName() {
    const bucketName = import.meta.env.S3_BUCKET_NAME;

    if (!bucketName) {
        throw new Error("S3_BUCKET_NAME is not set");
    }

    return bucketName;
}

export const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function listAlbumObjectKeys(albumSlug: string) {
    const bucketName = getBucketName();
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
    const bucketName = getBucketName();

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