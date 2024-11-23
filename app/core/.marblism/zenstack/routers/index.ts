/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createRoleDataRouter from "./RoleData.router";
import createSystemConfigRouter from "./SystemConfig.router";
import createDocumentRouter from "./Document.router";
import createDocumentVersionRouter from "./DocumentVersion.router";
import createDocumentPermissionRouter from "./DocumentPermission.router";
import createDocumentMetadataRouter from "./DocumentMetadata.router";
import createBookingRouter from "./Booking.router";
import createNotificationRouter from "./Notification.router";
import createUserPreferenceRouter from "./UserPreference.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as RoleDataClientType } from "./RoleData.router";
import { ClientType as SystemConfigClientType } from "./SystemConfig.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as DocumentVersionClientType } from "./DocumentVersion.router";
import { ClientType as DocumentPermissionClientType } from "./DocumentPermission.router";
import { ClientType as DocumentMetadataClientType } from "./DocumentMetadata.router";
import { ClientType as BookingClientType } from "./Booking.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as UserPreferenceClientType } from "./UserPreference.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        roleData: createRoleDataRouter(router, procedure),
        systemConfig: createSystemConfigRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        documentVersion: createDocumentVersionRouter(router, procedure),
        documentPermission: createDocumentPermissionRouter(router, procedure),
        documentMetadata: createDocumentMetadataRouter(router, procedure),
        booking: createBookingRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        userPreference: createUserPreferenceRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    roleData: RoleDataClientType<AppRouter>;
    systemConfig: SystemConfigClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    documentVersion: DocumentVersionClientType<AppRouter>;
    documentPermission: DocumentPermissionClientType<AppRouter>;
    documentMetadata: DocumentMetadataClientType<AppRouter>;
    booking: BookingClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    userPreference: UserPreferenceClientType<AppRouter>;
}
