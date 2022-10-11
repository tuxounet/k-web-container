import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import fs from "fs";
import { GenericError } from "../errors/types/GenericError";

@InjectableClass()
export class FsDriver extends BaseInjectable {
  async fileExists(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath);
  }

  async readTextFile(filePath: string): Promise<string> {
    if (!fs.existsSync(filePath)) throw GenericError.notFound("file", filePath);

    const content = await fs.promises.readFile(filePath, "utf-8");
    return content;
  }

  async readJsonFile<T>(filePath: string): Promise<T> {
    if (!fs.existsSync(filePath)) throw GenericError.notFound("file", filePath);

    const content = await fs.promises.readFile(filePath, "utf-8");
    try {
      const obj = JSON.parse(content) as T;
      return obj;
    } catch (e) {
      throw GenericError.badContent("file", filePath, content);
    }
  }

  async writeTextFile(filePath: string, body?: string): Promise<void> {
    let content = "";
    if (body !== undefined) content = body;
    await fs.promises.writeFile(filePath, content, "utf-8");
  }

  async writeJsonFile<T>(filePath: string, body: T): Promise<void> {
    const content = JSON.stringify(body, null, 3);
    await fs.promises.writeFile(filePath, content, "utf-8");
  }
}
