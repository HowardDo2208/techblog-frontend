import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react'
import * as reactRouterDom from 'react-router-dom'
import ThirdPartyEmailPassword, {
  Google,
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import { appInfo } from './config/appConfig'
import Home from './pages/Home'

SuperTokens.init({
  appInfo,
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init(),
  ],
})

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App

