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

        createMany: procedure.input($Schema.DocumentMetadataInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.createMany(input as any))),

        create: procedure.input($Schema.DocumentMetadataInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentMetadataInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentMetadataInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentMetadataInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentMetadata.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentMetadataInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentMetadata.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentMetadataInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentMetadata.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentMetadataInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.updateMany(input as any))),

        update: procedure.input($Schema.DocumentMetadataInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentMetadata.update(input as any))),

        count: procedure.input($Schema.DocumentMetadataInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentMetadata.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentMetadataCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentMetadataCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentMetadataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentMetadataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentMetadataGetPayload<T>, Context>) => Promise<Prisma.DocumentMetadataGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentMetadataDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentMetadataDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentMetadataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentMetadataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentMetadataGetPayload<T>, Context>) => Promise<Prisma.DocumentMetadataGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentMetadataFindFirstArgs, TData = Prisma.DocumentMetadataGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentMetadataFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentMetadataGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentMetadataFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentMetadataFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentMetadataGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentMetadataGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentMetadataFindManyArgs, TData = Array<Prisma.DocumentMetadataGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentMetadataFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentMetadataGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentMetadataFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentMetadataFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentMetadataGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentMetadataGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentMetadataFindUniqueArgs, TData = Prisma.DocumentMetadataGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentMetadataFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentMetadataGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentMetadataFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentMetadataFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentMetadataGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentMetadataGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentMetadataUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentMetadataUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentMetadataUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentMetadataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentMetadataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentMetadataUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentMetadataUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentMetadataGetPayload<T>, Context>) => Promise<Prisma.DocumentMetadataGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DocumentMetadataCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentMetadataCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DocumentMetadataCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DocumentMetadataCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DocumentMetadataCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DocumentMetadataCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DocumentMetadataCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentMetadataCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
