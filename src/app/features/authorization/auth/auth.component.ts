import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {ComponentHostDirective} from '../../../shared/directives/component-host.directive';
import {AuthModalService} from '../../../core/services/auth-modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.css']
})
export class AuthComponent implements OnInit {

    @ViewChild(ComponentHostDirective, {static: true}) public authHost!: ComponentHostDirective;
    public isRenderedLogIn: boolean = false;

    private _documentClick$: Observable<Event> = fromEvent(document, 'click');
    private _documentKeyDown$: Observable<Event> = fromEvent(document, 'keydown');
    private _subscriptions: Subscription[] = [];
    constructor(private readonly _authModalService: AuthModalService,
                private readonly _router: Router,
                private readonly _route: ActivatedRoute) {
    }

    public loadAuthComponent(): void {
        const containerRef: ViewContainerRef = this.authHost.viewContainerRef;
        containerRef.clear();
        if (this.isRenderedLogIn) {
            containerRef.createComponent<RegistrationComponent>(RegistrationComponent);
        } else {
            containerRef.createComponent<LoginComponent>(LoginComponent);
        }
    }

    public changingLogInTypeSubscribe(): void {
        this._authModalService.isLogInType$.subscribe((): void => {
            this.isRenderedLogIn = !this.isRenderedLogIn;
            this.loadAuthComponent();
        });
    }

    public clickOutsideSubscribe(context: AuthComponent): void {
        const clickSubscription: Subscription =
            context._documentClick$.subscribe((evt: Event): void => {
                    const authRef: Element = document.querySelector('.auth')!;
                    if (!evt.composedPath().includes(authRef!)) {
                        context._authModalService.changeModalOpening(false);
                        context.closeModal();
                    }
            });
        context._subscriptions.push(clickSubscription);
    }

    public keyDownSubscribe(context: AuthComponent): void {
        const keyDownSubscription: Subscription =
            context._documentKeyDown$.subscribe((evt: Event): void => {
                    if ((evt as KeyboardEvent).code === 'Escape') {
                        context._authModalService.changeModalOpening(false);
                        context.closeModal();
                    }
                }
            );
        context._subscriptions.push(keyDownSubscription);
    }

    public ngOnInit(): void {
        this._authModalService.changeModalOpening(true);
        const context: AuthComponent = this;
        this._authModalService.isModalOpening$.subscribe(function (isOpening: boolean): void {
            if (!isOpening) {
                context.closeModal();
            }
        });
        this.changingLogInTypeSubscribe();
        this.loadAuthComponent();

        setTimeout(function(): void {
            context.clickOutsideSubscribe(context);
            context.keyDownSubscribe(context);
        }, 100);
    }

    public closeModal(): void {
        this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        this._router.navigate(['./'], {relativeTo: this._route.parent}).then();
    }
}
