export const Do: {} = {};
/**
 * n, f -> a -> a & { n: f(a) }
 */
export const bind =
  <N extends PropertyKey, A, B>(name: N, f: (a: A) => B) =>
  <C extends A>(a: C) =>
    ({ ...a, [name]: f(a) } as { readonly [K in N | keyof C]: K extends N ? B : K extends keyof C ? C[K] : never });
/**
 * n -> a -> { n: a }
 */
export const bindTo =
  <N extends PropertyKey>(name: N) =>
  <A>(fa: A): { readonly [K in N]: A } =>
    ({ [name]: fa } as { readonly [K in N]: A });

/**
 * a -> b -> a & b
 */
export const assign =
  <T>(a: T) =>
  <S>(b: S): { readonly [K in keyof S | keyof T]: K extends keyof T ? T[K] : K extends keyof S ? S[K] : never } =>
    Object.assign({}, a, b) as { readonly [K in keyof S | keyof T]: K extends keyof T ? T[K] : K extends keyof S ? S[K] : never };
/**
 * k[] -> o -> { k: o[k] }
 */
export const remain =
  <K extends string, P extends K>(props: P[]) =>
  <T extends { [P in K]: T[P] }>(obj: T) =>
    Object.fromEntries((Object.entries(obj) as [P, T[P]][]).filter(([key]) => props.includes(key))) as {
      [Q in P]: T[Q];
    };
