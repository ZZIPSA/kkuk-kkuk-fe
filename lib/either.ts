export type Left<L> = { _tag: 'Left'; left: L };
export type Right<R> = { _tag: 'Right'; right: R };
export type Either<L, R> = Left<L> | Right<R>;

export const of = <L, R>(e: R): Either<L, R> => right(e);
export const left = <L>(left: L): Left<L> => ({ _tag: 'Left', left });
export const isLeft = <L, R>(e: Either<L, R>): e is Left<L> => e._tag === 'Left';
export const right = <R>(right: R): Right<R> => ({ _tag: 'Right', right });
export const isRight = <L, R>(e: Either<L, R>): e is Right<R> => e._tag === 'Right';

/**
 * predicate -> a -> Either a a
 */
export const lift =
  <T, L extends T, R extends T>(pred: (t: T) => boolean) =>
  (t: T) =>
    pred(t) ? right(t as R) : left(t as L);
/**
 * f:(a -> b) -> a -> Either e b
 */
export const map =
  <R, R1>(f: (r: R) => R1) =>
  <L>(e: Either<L, R>): Either<L, R1> =>
    isLeft(e) ? e : right(f(e.right));
/**
 * f:(e -> g) -> a -> Either g b
 */
export const mapLeft =
  <L, L1>(f: (l: L) => L1) =>
  <R>(e: Either<L, R>): Either<L1, R> =>
    isLeft(e) ? left(f(e.left)) : e;
/**
 * f1:(a -> b), f2:(e -> g) -> Either e a -> Either g b
 */
export const bimap =
  <L0, R0, L1, R1>(onLeft: (e: L0) => L1, onRight: (e: R0) => R1) =>
  (e: Either<L0, R0>): Either<L1, R1> =>
    isLeft(e) ? mapLeft(onLeft)(e) : map(onRight)(e);
/**
 * f:(e -> never) -> Either e a -> a
 */
export const purify =
  <L, R>(onLeft: (left: L) => never) =>
  (e: Either<L, R>): R =>
    isLeft(e) ? onLeft(e.left) : e.right;
/**
 * f1:(e -> b), f2:(a -> b) -> Either e a -> b
 */
export const fold =
  <L0, R0, T>(onLeft: (left: L0) => T, onRight: (right: R0) => T) =>
  (e: Either<L0, R0>): T =>
    isLeft(e) ? onLeft(e.left) : onRight(e.right);
/**
 * Either (Promise e) (Promise a) -> Promise (Either e a)
 * Promise.all for Either
 */
export const awaited = async <L, R>(e: Either<PromiseLike<L>, PromiseLike<R>>): Promise<Either<Awaited<PromiseLike<L>>, Awaited<PromiseLike<R>>>> =>
  isLeft(e) ? left(await e.left) : right(await e.right);

/**
 * Either e a -> a | e
 */
export const pop = <L, R>(e: Either<L, R>): L | R => (isLeft(e) ? e.left : e.right);
/**
 * f:(e -> b), g:(a -> b) -> Either e a -> b
 */
export const match =
  <L, R, T>(onLeft: (left: L) => T, onRight: (right: R) => T) =>
  (e: Either<L, R>): T =>
    isLeft(e) ? onLeft(e.left) : onRight(e.right);
/**
 * f:(a -> boolean), g:(a -> e) -> Either e a -> Either e a
 */
export const filter =
  <L, R0>(pred: (r: R0) => boolean, onFalse: (r: R0) => L) =>
  <R1 extends R0>(e: Either<L, R1>): Either<L, R1> =>
    isLeft(e) ? e : pred(e.right) ? e : left(onFalse(e.right));
