/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  Template,
  TemplateContent,
  TemplateOnlyTitleOrHtml,
  TopMostRequest,
  WindowInfo,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    TemplateFromJSON,
    TemplateToJSON,
    TemplateContentFromJSON,
    TemplateContentToJSON,
    TemplateOnlyTitleOrHtmlFromJSON,
    TemplateOnlyTitleOrHtmlToJSON,
    TopMostRequestFromJSON,
    TopMostRequestToJSON,
    WindowInfoFromJSON,
    WindowInfoToJSON,
} from '../models/index';

export interface CreateTemplateTemplatesPostRequest {
    templateContent: TemplateContent;
}

export interface DeleteTemplateTemplatesIdDeleteRequest {
    id: number;
}

export interface GetTemplateByIdTemplatesIdIdGetRequest {
    id: number;
}

export interface GetTemplateByTitleTemplatesTitleTitleGetRequest {
    title: string;
}

export interface PatchTemplateTemplatesIdIdPatchRequest {
    id: number;
    templateOnlyTitleOrHtml: TemplateOnlyTitleOrHtml;
}

export interface TopmostWindowsTopmostPostRequest {
    topMostRequest: TopMostRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Create Template
     */
    async createTemplateTemplatesPostRaw(requestParameters: CreateTemplateTemplatesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<number>> {
        if (requestParameters.templateContent === null || requestParameters.templateContent === undefined) {
            throw new runtime.RequiredError('templateContent','Required parameter requestParameters.templateContent was null or undefined when calling createTemplateTemplatesPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/templates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TemplateContentToJSON(requestParameters.templateContent),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<number>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Create Template
     */
    async createTemplateTemplatesPost(requestParameters: CreateTemplateTemplatesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<number> {
        const response = await this.createTemplateTemplatesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete Template
     */
    async deleteTemplateTemplatesIdDeleteRaw(requestParameters: DeleteTemplateTemplatesIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<number>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTemplateTemplatesIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/templates/{id_}`.replace(`{${"id_"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Delete Template
     */
    async deleteTemplateTemplatesIdDelete(requestParameters: DeleteTemplateTemplatesIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<number>> {
        const response = await this.deleteTemplateTemplatesIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get All Templates
     */
    async getAllTemplatesTemplatesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Template>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/templates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TemplateFromJSON));
    }

    /**
     * Get All Templates
     */
    async getAllTemplatesTemplatesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Template>> {
        const response = await this.getAllTemplatesTemplatesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get Template By Id
     */
    async getTemplateByIdTemplatesIdIdGetRaw(requestParameters: GetTemplateByIdTemplatesIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Template>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTemplateByIdTemplatesIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/templates/id/{id_}`.replace(`{${"id_"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TemplateFromJSON(jsonValue));
    }

    /**
     * Get Template By Id
     */
    async getTemplateByIdTemplatesIdIdGet(requestParameters: GetTemplateByIdTemplatesIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Template> {
        const response = await this.getTemplateByIdTemplatesIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Template By Title
     */
    async getTemplateByTitleTemplatesTitleTitleGetRaw(requestParameters: GetTemplateByTitleTemplatesTitleTitleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Template>>> {
        if (requestParameters.title === null || requestParameters.title === undefined) {
            throw new runtime.RequiredError('title','Required parameter requestParameters.title was null or undefined when calling getTemplateByTitleTemplatesTitleTitleGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/templates/title/{title}`.replace(`{${"title"}}`, encodeURIComponent(String(requestParameters.title))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TemplateFromJSON));
    }

    /**
     * Get Template By Title
     */
    async getTemplateByTitleTemplatesTitleTitleGet(requestParameters: GetTemplateByTitleTemplatesTitleTitleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Template>> {
        const response = await this.getTemplateByTitleTemplatesTitleTitleGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Patch Template
     */
    async patchTemplateTemplatesIdIdPatchRaw(requestParameters: PatchTemplateTemplatesIdIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<number>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchTemplateTemplatesIdIdPatch.');
        }

        if (requestParameters.templateOnlyTitleOrHtml === null || requestParameters.templateOnlyTitleOrHtml === undefined) {
            throw new runtime.RequiredError('templateOnlyTitleOrHtml','Required parameter requestParameters.templateOnlyTitleOrHtml was null or undefined when calling patchTemplateTemplatesIdIdPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/templates/id/{id_}`.replace(`{${"id_"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: TemplateOnlyTitleOrHtmlToJSON(requestParameters.templateOnlyTitleOrHtml),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Patch Template
     */
    async patchTemplateTemplatesIdIdPatch(requestParameters: PatchTemplateTemplatesIdIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<number>> {
        const response = await this.patchTemplateTemplatesIdIdPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Topmost Windows
     */
    async topmostWindowsTopmostPostRaw(requestParameters: TopmostWindowsTopmostPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters.topMostRequest === null || requestParameters.topMostRequest === undefined) {
            throw new runtime.RequiredError('topMostRequest','Required parameter requestParameters.topMostRequest was null or undefined when calling topmostWindowsTopmostPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/topmost`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TopMostRequestToJSON(requestParameters.topMostRequest),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Topmost Windows
     */
    async topmostWindowsTopmostPost(requestParameters: TopmostWindowsTopmostPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.topmostWindowsTopmostPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Visible Windows
     */
    async visibleWindowsWindowsPostRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<WindowInfo>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/windows`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WindowInfoFromJSON));
    }

    /**
     * Visible Windows
     */
    async visibleWindowsWindowsPost(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<WindowInfo>> {
        const response = await this.visibleWindowsWindowsPostRaw(initOverrides);
        return await response.value();
    }

}
