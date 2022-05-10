import ThirdPartyEmailPasswordReact, {
  Google
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [Google.init()]
        }
        // onHandleEvent: async (context) => {
        //   if (context.action === 'SESSION_ALREADY_EXISTS') {
        //     // TODO:
        //     console.log('SESSION_ALREADY_EXISTS');
        //   } else if (context.action === 'SUCCESS') {
        //     console.log('login success');
        //   }
        // },
        // getRedirectionURL: async (context) => {
        //   if (context.action === 'SUCCESS') {
        //     if (context.redirectToPath !== undefined) {
        //       // we are navigating back to where the user was before they authenticated
        //       return context.redirectToPath;
        //     }
        //     return '/';
        //   }
        //   return undefined;
        // }
      }),
      SessionReact.init()
    ]
  }
}
