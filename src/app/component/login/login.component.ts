import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/User.model';
import {AuthenticationService} from '../../service/authenticate/authentication.service';
import {UserService} from "../../service/user/user.service";
import {SocialMediaService} from "../../service/socialMedia/social-media.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {SocialMediaToken} from "../../model/SocialMediaToken.model";
import {AuthenticationResponse} from "../../model/AuthenticationResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user: User = new User();
  token: string;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService,
              private _authenticationService: AuthenticationService,
              private _routerService: Router,
              private authService: SocialAuthService,
              private _socialMediaService: SocialMediaService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    });
    this.getAllUsers();
  }


  public login() {
    Object.assign(this.user, this.formLogin.value);

    this._authenticationService.login(this.user).subscribe((response: any) => {

      console.log(response);
      if (response.jwtToken) {
        localStorage.setItem("token", response.jwtToken);
        this._routerService.navigate(['/home']);
      }
    }, (error: Error) => {

      console.log(error);
    })

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
      let token = new SocialMediaToken();
      token.token = response.idToken;
      this._socialMediaService.loginWithGoogle(token).subscribe((response:AuthenticationResponse)=>{
        console.log(response.jwtToken);
        localStorage.setItem("token", response.jwtToken );
        this._routerService.navigate(['/home']);
      }, (error)=>{

        console.log(error);
      })

    }, (error) => {
      console.log(error);
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response) => {
      let token = new SocialMediaToken();
      token.token = response.authToken;
      this._socialMediaService.loginWithFacebook(token).subscribe((response: AuthenticationResponse) => {
        console.log(response.jwtToken);
        localStorage.setItem("token", response.jwtToken);
        this._routerService.navigate(['/home']);
      }, (error) => {

        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }


  public getAllUsers() {
    this._userService.getUsers().subscribe((response: Response) => {
      console.log("response.headers ", response.headers.get("authorization"));
    });
  }
}
