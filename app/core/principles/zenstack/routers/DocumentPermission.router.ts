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

        createMany: procedure.input($Schema.DocumentPermissionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.createMany(input as any))),

        create: procedure.input($Schema.DocumentPermissionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentPermissionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentPermissionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentPermissionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentPermission.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentPermissionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentPermission.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentPermissionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentPermission.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentPermissionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.updateMany(input as any))),

        update: procedure.input($Schema.DocumentPermissionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentPermission.update(input as any))),

        count: procedure.input($Schema.DocumentPermissionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).documentPermission.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentPermissionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentPermissionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentPermissionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentPermissionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentPermissionGetPayload<T>, Context>) => Promise<Prisma.DocumentPermissionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentPermissionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentPermissionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentPermissionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentPermissionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentPermissionGetPayload<T>, Context>) => Promise<Prisma.DocumentPermissionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentPermissionFindFirstArgs, TData = Prisma.DocumentPermissionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentPermissionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentPermissionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentPermissionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentPermissionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentPermissionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentPermissionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentPermissionFindManyArgs, TData = Array<Prisma.DocumentPermissionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DocumentPermissionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentPermissionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentPermissionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DocumentPermissionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentPermissionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentPermissionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentPermissionFindUniqueArgs, TData = Prisma.DocumentPermissionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentPermissionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentPermissionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentPermissionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentPermissionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentPermissionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentPermissionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentPermissionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentPermissionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentPermissionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentPermissionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentPermissionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentPermissionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentPermissionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentPermissionGetPayload<T>, Context>) => Promise<Prisma.DocumentPermissionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DocumentPermissionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentPermissionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DocumentPermissionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DocumentPermissionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DocumentPermissionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DocumentPermissionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DocumentPermissionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DocumentPermissionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
