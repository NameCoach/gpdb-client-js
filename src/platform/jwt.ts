import { KJUR }  from "jsrsasign"

interface JWTSignInput {
  algorithm: string;
  payload: string | Record<string, unknown>;
  header: Record<string, unknown>;
  secretAccessKey: string;
}

const sign = (input: JWTSignInput): string => {
  return KJUR.jws.JWS.sign(
    null,
    JSON.stringify({ alg: input.algorithm, ...input.header  }),
    input.payload,
    input.secretAccessKey
  )
}

export { sign };
