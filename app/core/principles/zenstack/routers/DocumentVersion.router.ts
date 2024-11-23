/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.DocumentVersionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.createMany(input as any))),

        create: procedure.input($Schema.DocumentVersionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentVersionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentVersionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentVersionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentVersion.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentVersionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentVersion.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentVersionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentVersion.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentVersionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.updateMany(input as any))),

        update: procedure.input($Schema.DocumentVersionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentVersion.update(input as any))),

        count: procedure.input($Schema.DocumentVersionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentVersion.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentVersionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentVersionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentVersionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentVersionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentVersionGetPayload<T>, Context>) => Promise<Prisma.DocumentVersionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentVersionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentVersionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentVersionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentVersionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentVersionGetPayload<T>, Context>) => Promise<Prisma.DocumentVersionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentVersionFindFirstArgs, TData = Prisma.DocumentVersionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentVersionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentVersionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentVersionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentVersionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentVersionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentVersionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentVersionFindManyArgs, TData = Array<Prisma.DocumentVersionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentVersionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentVersionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentVersionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentVersionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentVersionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentVersionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentVersionFindUniqueArgs, TData = Prisma.DocumentVersionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentVersionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentVersionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentVersionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentVersionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentVersionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentVersionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentVersionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentVersionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentVersionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentVersionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentVersionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentVersionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentVersionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentVersionGetPayload<T>, Context>) => Promise<Prisma.DocumentVersionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DocumentVersionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentVersionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DocumentVersionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DocumentVersionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DocumentVersionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DocumentVersionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DocumentVersionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentVersionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
