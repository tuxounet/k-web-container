export class GenericError extends Error {
  static notFound(what: string, which: string): GenericError {
    return new GenericError(404, `${what} ${which} est introuvable`);
  }

  static unsupportedQuery(what: string, which: string): GenericError {
    return new GenericError(405, `${what} ${which} n'est pas géré`);
  }

  static badContent(what: string, which: string, within: string): GenericError {
    return new GenericError(
      422,
      `${what} ${which} n'a pas le bon format pour le contenu ${within}`
    );
  }

  constructor(readonly code: number, readonly message: string) {
    super(message);
  }
}
