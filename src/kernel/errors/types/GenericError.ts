export class GenericError extends Error {
  static notFound(what: string, which: string): GenericError {
    return new GenericError(404, `${what} ${which} est introuvable`);
  }

  static unsupportedQuery(what: string, which: string): GenericError {
    return new GenericError(405, `${what} ${which} n'est pas géré`);
  }

  constructor(readonly code: number, readonly message: string) {
    super(message);
  }
}
