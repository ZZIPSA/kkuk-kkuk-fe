import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_KEY_ID, BASE_KEY, BUCKET_NAME, REGION, SECRET_ACCESS_KEY } from '../constants';

export class S3Manager {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * S3에 있는 객체를 newKey로 복사
   *
   * @param targetKey 복사할 객체의 S3 key
   * @param newKey 복사된 객체의 S3 key
   */
  private async copyObject(targetKey: string, newKey: string) {
    const copyCommand = new CopyObjectCommand({
      CopySource: `${BUCKET_NAME}/${targetKey}`,
      Bucket: BUCKET_NAME,
      Key: `${BASE_KEY}/${newKey}`,
    });
    try {
      await this.client.send(copyCommand);
    } catch (err) {
      throw new Error('Error Copying object');
    }
  }

  /**
   * S3에 있는 객체를 이동
   *
   * @param targetKey 이동할 객체의 S3 key
   * @param destinationKey 객체가 이동될 목표 S3 key
   */
  private async moveObject(targetKey: string, destinationKey: string) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: targetKey,
    });

    try {
      await this.copyObject(targetKey, destinationKey);
      await this.client.send(deleteCommand);
    } catch (err) {
      throw new Error('Error moving object');
    }
  }

  /**
   * S3의 URL에서 key만 추출해서 반환
   *
   * @param url S3의 URL
   * @returns 추출된 key
   */
  extractS3Key(url: string): string {
    const regex = /https:\/\/(?:[a-z0-9-]+\.)?s3\.[a-z0-9-]+\.amazonaws\.com\/([^?]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Invalid S3 URL');
    }
  }

  /**
   *
   * @param S3 오브젝트의 키
   * @returns stamp id
   */
  extractCuid(key: string): string {
    const parts = key.split('/');
    return parts[parts.length - 1];
  }

  /**
   * 객체에 대한 Presigned URL을 생성
   *
   * @param key 유저가 올린 파일명
   * @param userId 유저 아이디
   * @returns S3 Presigned URL (60초간 유효)
   */
  async getPresignedUrl(key: string): Promise<string> {
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BASE_KEY}/tmp/${key}`,
      ContentType: 'image/webp',
    });

    try {
      const url = await getSignedUrl(this.client, putCommand, { expiresIn: 60 });
      return url;
    } catch (err) {
      throw new Error('Error generating presigned URL');
    }
  }

  /**
   * S3에서 객체를 취득하기 위한 서명된 URL을 반환
   *
   * @param key 가져올 대상 객체의 key
   * @returns 객체를 획득할 수 있는 일시적인 URL
   */
  async getObjectUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BASE_KEY}/${key}`,
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn: 3600 });

    return signedUrl;
  }
  /**
   * S3에서 이미지를 영구 저장소로 이동
   *
   * @param imageUrls 이동할 이미지 URL 배열
   * @param uploaderId 업로더 ID
   * @param newKitId 새로운 키트 ID
   * @returns 새로운 이미지 URL 배열
   */
  async moveToLongTermStorage(imageUrls: string[], newKitId: string): Promise<string[]> {
    return Promise.all(
      imageUrls.map(async (url: string) => {
        const targetKey = this.extractS3Key(url);
        const stampId = this.extractCuid(targetKey);
        const newObjectKey = `${newKitId}/${stampId}`;

        await this.moveObject(targetKey, newObjectKey);

        return newObjectKey;
      }),
    );
  }
}
