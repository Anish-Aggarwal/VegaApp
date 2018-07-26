import { ErrorHandler, NgZone, Inject } from "../../node_modules/@angular/core";
import { ToastyService } from "../../node_modules/ng2-toasty";

export class AppErrorHandler implements ErrorHandler {

    constructor(@Inject(ToastyService) private toastyservice: ToastyService, private ngZone: NgZone) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            this.toastyservice.error({
                title: 'Error',
                msg: 'An unexpected error has happened',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });

    }

}