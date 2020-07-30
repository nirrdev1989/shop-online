import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface HttpMessage {
    type?: HttpErrorResponse | HttpResponse<string>
    status?: number
    description?: string
    success: boolean
}