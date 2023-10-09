export class NotFoundException extends Error {
    readonly status: number = 404;
  readonly name: string = 'ResourceNotFoundException';
  readonly message: string = 'Not found';
}