/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RewardListResponse {
  rewardList: RewardResponse[];
}

export interface RewardResponse {
  id: string;
  name: string;
  /** @format date-time */
  expiresAt?: string;
  loyaltyTransactionId?: string;
  status?:
    | "ACTIVE"
    | "LOCKED"
    | "NOT_FOUND"
    | "RELEASED"
    | "UNKNOWN_STATUS"
    | "NO_VOUCHER_ID_FOUND"
    | "REDEEMED"
    | "EXPIRED"
    | "DEACTIVATED"
    | "INACTIVE";
}

export interface UpdateGuestRequest {
  name?: string;
  msisdn?: string;
  locale?: string;
}

export interface GuestResponse {
  emailAddress: string;
  identifier: string;
  name: string;
  msisdn?: string;
  locale: {
    language?: string;
    displayName?: string;
    country?: string;
    variant?: string;
    script?: string;
    /** @uniqueItems true */
    unicodeLocaleAttributes?: string[];
    /** @uniqueItems true */
    unicodeLocaleKeys?: string[];
    displayLanguage?: string;
    displayScript?: string;
    displayCountry?: string;
    displayVariant?: string;
    /** @uniqueItems true */
    extensionKeys?: string[];
    iso3Language?: string;
    iso3Country?: string;
  };
  loyaltyEnabled: boolean;
  externalLoyaltyId?: string;
  loyalty?: Loyalty;
  /** @format date-time */
  lastPurchaseTime?: string;
  /** @format date-time */
  createdDate?: string;
  /** @format date-time */
  updatedDate?: string;
}

export interface Loyalty {
  uuid: string;
  name: string;
  emailAddress: string;
  /** @format int32 */
  points: number;
  /** @format int32 */
  totalPoints: number;
  /** @format int32 */
  currentPoints: number;
  tier?: Tier;
}

export interface Tier {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface PiggyConfigRequest {
  clientId: string;
  clientSecret: string;
}

export interface PiggyConfigResponse {
  id: string;
  clientId: string;
  maskedClientSecret: string;
  /** @format date-time */
  createdDate: string;
  /** @format date-time */
  updatedDate: string;
}

export interface PlacePiggyShopListRequest {
  shopList: PlacePiggyShopRequest[];
}

export interface PlacePiggyShopRequest {
  placeId: string;
  shopId: string;
}

export interface PlacePiggyShopListResponse {
  shopList: PlacePiggyShopResponse[];
}

export interface PlacePiggyShopResponse {
  id: string;
  placeId: string;
  shopId: string;
  /** @format date-time */
  createdDate: string;
  /** @format date-time */
  updatedDate: string;
}

export interface VoucherStatusResponse {
  status:
    | "ACTIVE"
    | "LOCKED"
    | "NOT_FOUND"
    | "RELEASED"
    | "UNKNOWN_STATUS"
    | "NO_VOUCHER_ID_FOUND"
    | "REDEEMED"
    | "EXPIRED"
    | "DEACTIVATED"
    | "INACTIVE";
}

export interface CallbackRequest {
  data?: Data;
}

export interface Contact {
  uuid: string;
}

export interface Data {
  contact?: Contact;
}

export interface CreateGuestRequest {
  name: string;
  emailAddress: string;
  msisdn?: string;
  locale: string;
  loyaltyEnabled: boolean;
}

export interface StatusResponse {
  status: "ACTIVE" | "INACTIVE";
}

export interface TierListResponse {
  tierList: TierResponse[];
}

export interface TierResponse {
  id: string;
  name: string;
}

export interface PromotionListResponse {
  promotionList: PromotionResponse[];
}

export interface PromotionResponse {
  id: string;
  name: string;
}

export interface ContactCreditBalanceResponse {
  /** @format int32 */
  balance?: number;
}

export interface GuestListResponse {
  guestList: GuestResponse[];
}

export interface PiggyShopListResponse {
  shopList: PiggyShopResponse[];
}

export interface PiggyShopResponse {
  shopId: string;
  name: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://guest.dev.caspeco.net";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Guest service
 * @version 1.0
 * @baseUrl https://guest.dev.caspeco.net
 *
 * Caspeco guest service
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Loyalty
     * @name GetCollectableRewards
     * @request GET:/v1/loyalties/collectable-rewards
     */
    getCollectableRewards: (
      query: {
        guestIdentifier: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/collectable-rewards`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name CollectCollectableRewards
     * @request PUT:/v1/loyalties/collectable-rewards
     */
    collectCollectableRewards: (
      query: {
        loyaltyTransactionId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/collectable-rewards`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guest
     * @name GetGuest
     * @request GET:/v1/guests/{identifierOrEmail}
     */
    getGuest: (identifierOrEmail: string, params: RequestParams = {}) =>
      this.request<GuestResponse, any>({
        path: `/v1/guests/${identifierOrEmail}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guest
     * @name UpdateGuest
     * @request PUT:/v1/guests/{identifierOrEmail}
     */
    updateGuest: (identifierOrEmail: string, data: UpdateGuestRequest, params: RequestParams = {}) =>
      this.request<GuestResponse, any>({
        path: `/v1/guests/${identifierOrEmail}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guest
     * @name DeleteGuest
     * @request DELETE:/v1/guests/{identifierOrEmail}
     */
    deleteGuest: (identifierOrEmail: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/guests/${identifierOrEmail}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name UpdateConfiguration
     * @request PUT:/v1/admin/loyalties/{id}
     */
    updateConfiguration: (id: string, data: PiggyConfigRequest, params: RequestParams = {}) =>
      this.request<PiggyConfigResponse, any>({
        path: `/v1/admin/loyalties/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name DeleteConfiguration
     * @request DELETE:/v1/admin/loyalties/{id}
     */
    deleteConfiguration: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/admin/loyalties/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetPlaceShops
     * @request GET:/v1/admin/loyalties/shops
     */
    getPlaceShops: (params: RequestParams = {}) =>
      this.request<PlacePiggyShopListResponse, any>({
        path: `/v1/admin/loyalties/shops`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name ReplaceAllPlaceShops
     * @request PUT:/v1/admin/loyalties/shops
     */
    replaceAllPlaceShops: (data: PlacePiggyShopListRequest, params: RequestParams = {}) =>
      this.request<PlacePiggyShopListResponse, any>({
        path: `/v1/admin/loyalties/shops`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name CreatePlaceShop
     * @request POST:/v1/admin/loyalties/shops
     */
    createPlaceShop: (data: PlacePiggyShopRequest, params: RequestParams = {}) =>
      this.request<PlacePiggyShopResponse, any>({
        path: `/v1/admin/loyalties/shops`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetPlaceShops1
     * @request GET:/v1/admin/loyalties/shops/{id}
     */
    getPlaceShops1: (id: string, params: RequestParams = {}) =>
      this.request<PlacePiggyShopResponse, any>({
        path: `/v1/admin/loyalties/shops/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name UpdatePlaceShop
     * @request PUT:/v1/admin/loyalties/shops/{id}
     */
    updatePlaceShop: (id: string, data: PlacePiggyShopRequest, params: RequestParams = {}) =>
      this.request<PlacePiggyShopResponse, any>({
        path: `/v1/admin/loyalties/shops/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name DeletePlaceShop
     * @request DELETE:/v1/admin/loyalties/shops/{id}
     */
    deletePlaceShop: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/admin/loyalties/shops/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name ReleaseVoucher
     * @request POST:/v1/loyalties/voucher/release
     */
    releaseVoucher: (
      query: {
        guestIdentifier: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<VoucherStatusResponse, any>({
        path: `/v1/loyalties/voucher/release`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name LockVoucher
     * @request POST:/v1/loyalties/voucher/lock
     */
    lockVoucher: (
      query: {
        guestIdentifier: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<VoucherStatusResponse, any>({
        path: `/v1/loyalties/voucher/lock`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name LoyaltyCallback
     * @request POST:/v1/loyalties/callbacks
     */
    loyaltyCallback: (data: CallbackRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/loyalties/callbacks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guest
     * @name GetGuests
     * @request GET:/v1/guests
     */
    getGuests: (params: RequestParams = {}) =>
      this.request<GuestListResponse, any>({
        path: `/v1/guests`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guest
     * @name CreateGuest
     * @request POST:/v1/guests
     */
    createGuest: (data: CreateGuestRequest, params: RequestParams = {}) =>
      this.request<GuestResponse, any>({
        path: `/v1/guests`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetConfiguration
     * @request GET:/v1/admin/loyalties
     */
    getConfiguration: (params: RequestParams = {}) =>
      this.request<PiggyConfigResponse, any>({
        path: `/v1/admin/loyalties`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name CreateConfiguration
     * @request POST:/v1/admin/loyalties
     */
    createConfiguration: (data: PiggyConfigRequest, params: RequestParams = {}) =>
      this.request<PiggyConfigResponse, any>({
        path: `/v1/admin/loyalties`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetLoyaltyStatus
     * @request GET:/v1/loyalties
     */
    getLoyaltyStatus: (params: RequestParams = {}) =>
      this.request<StatusResponse, any>({
        path: `/v1/loyalties`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name CollectVouchers
     * @request GET:/v1/loyalties/vouchers
     */
    collectVouchers: (
      query: {
        guestIdentifier: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/vouchers`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name CollectVoucher
     * @request GET:/v1/loyalties/voucher
     */
    collectVoucher: (
      query: {
        guestIdentifier: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/voucher`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name UpdateCampaign
     * @request GET:/v1/loyalties/updateCampaign
     */
    updateCampaign: (
      query: {
        contactId: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/updateCampaign`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetTiers
     * @request GET:/v1/loyalties/tiers
     */
    getTiers: (params: RequestParams = {}) =>
      this.request<TierListResponse, any>({
        path: `/v1/loyalties/tiers`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetRewards
     * @request GET:/v1/loyalties/rewards
     */
    getRewards: (params: RequestParams = {}) =>
      this.request<RewardListResponse, any>({
        path: `/v1/loyalties/rewards`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetPromotions
     * @request GET:/v1/loyalties/promotions
     */
    getPromotions: (params: RequestParams = {}) =>
      this.request<PromotionListResponse, any>({
        path: `/v1/loyalties/promotions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetCreditBalance
     * @request GET:/v1/loyalties/creditBalance
     */
    getCreditBalance: (
      query: {
        contactId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContactCreditBalanceResponse, any>({
        path: `/v1/loyalties/creditBalance`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loyalty
     * @name GetPiggyShops
     * @request GET:/v1/admin/loyalties/piggy-shops
     */
    getPiggyShops: (params: RequestParams = {}) =>
      this.request<PiggyShopListResponse, any>({
        path: `/v1/admin/loyalties/piggy-shops`,
        method: "GET",
        ...params,
      }),
  };
}
