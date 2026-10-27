import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSecret } from "astro:env/server";

const defaultRegion = "ap-southeast-2";

let s3Client: S3Client | undefined;

function getS3Client() {
    return (s3Client ??= new S3Client({}));
}

export async function listAlbumObjectKeys(albumSlug: string) {
    const bucketName = getSecret("S3_BUCKET_NAME")
    const s3Client = getS3Client();
    const keys: string[] = [];
    let continuationToken: string | undefined;

    do {
        const response = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: `${albumSlug}/`,
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

    return keys.sort();
}

export async function listAlbumImageUrls(albumSlug: string) {
    const keys = await listAlbumObjectKeys(albumSlug);

    return keys.map(getImageUrl);
}

export function getImageUrl(key: string) {
    const cdnDomain = getSecret("CLOUDFRONT_DOMAIN");
    return `https://${cdnDomain}/${key}`;
}

export async function getAlbumCoverUrl(albumSlug: string) {
    const keys = await listAlbumObjectKeys(albumSlug);

    return getImageUrl(keys[0]);
}