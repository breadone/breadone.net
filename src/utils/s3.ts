import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSecret } from "astro:env/server";

const defaultRegion = "ap-southeast-2";

let s3Client: S3Client | undefined;

function getS3Client() {
    return (s3Client ??= new S3Client({ region: defaultRegion }));
}

export async function listAlbumObjectKeys(albumSlug: string) {
    const bucketName = getSecret("S3_BUCKET_NAME")
    const s3Client = getS3Client();

    try {
        const response = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: `${albumSlug}/`,
            }),
        );

        return (response.Contents!)
            .map((object) => object.Key)
            .filter((key): key is string => !!key) // ensure keys are strings
            .sort();
    } catch {
        return ['could not read album!']
    }
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