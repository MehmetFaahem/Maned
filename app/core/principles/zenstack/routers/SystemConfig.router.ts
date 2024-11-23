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

        createMany: procedure.input($Schema.SystemConfigInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.createMany(input as any))),

        create: procedure.input($Schema.SystemConfigInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.create(input as any))),

        deleteMany: procedure.input($Schema.SystemConfigInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.deleteMany(input as any))),

        delete: procedure.input($Schema.SystemConfigInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.delete(input as any))),

        findFirst: procedure.input($Schema.SystemConfigInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).systemConfig.findFirst(input as any))),

        findMany: procedure.input($Schema.SystemConfigInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).systemConfig.findMany(input as any))),

        findUnique: procedure.input($Schema.SystemConfigInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).systemConfig.findUnique(input as any))),

        updateMany: procedure.input($Schema.SystemConfigInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.updateMany(input as any))),

        update: procedure.input($Schema.SystemConfigInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).systemConfig.update(input as any))),

        count: procedure.input($Schema.SystemConfigInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).systemConfig.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SystemConfigCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SystemConfigCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SystemConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SystemConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SystemConfigGetPayload<T>, Context>) => Promise<Prisma.SystemConfigGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SystemConfigDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SystemConfigDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SystemConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SystemConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SystemConfigGetPayload<T>, Context>) => Promise<Prisma.SystemConfigGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SystemConfigFindFirstArgs, TData = Prisma.SystemConfigGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SystemConfigFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SystemConfigGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SystemConfigFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SystemConfigFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SystemConfigGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SystemConfigGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SystemConfigFindManyArgs, TData = Array<Prisma.SystemConfigGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SystemConfigFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SystemConfigGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SystemConfigFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SystemConfigFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SystemConfigGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SystemConfigGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SystemConfigFindUniqueArgs, TData = Prisma.SystemConfigGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SystemConfigFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SystemConfigGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SystemConfigFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SystemConfigFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SystemConfigGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SystemConfigGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SystemConfigUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SystemConfigUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SystemConfigUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SystemConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SystemConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SystemConfigUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SystemConfigUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SystemConfigGetPayload<T>, Context>) => Promise<Prisma.SystemConfigGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SystemConfigCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SystemConfigCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SystemConfigCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SystemConfigCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SystemConfigCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SystemConfigCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SystemConfigCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SystemConfigCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
