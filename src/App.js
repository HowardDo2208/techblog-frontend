import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';
import * as reactRouterDom from 'react-router-dom';
import ThirdPartyEmailPassword, {
  Google
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { appInfo } from './config/appConfig';
import AppProviders from './components/AppProviders/AppProviders';
import MainNavigation from './components/MainNavigation/MainNavigation';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import UserProfile from './pages/UserProfile/UserProfile';
import { AuthContext } from './context/auth';
import useAuth from './hooks/useAuth';
import SearchResults from './pages/SearchResults/SearchResults';
import NewPost from './pages/NewPost/NewPost';

SuperTokens.init({
  appInfo,
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init()]
      }
    }),
    Session.init()
  ]
});

function App() {
  return (
    <AppProviders>
      <MainNavigation />

      <Routes>
        <Route path="/" element={<Home />} />
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        <Route path="/users/:userId" element={<UserProfile />} />
        {/* <Route path="/users/:userId/edit" exact>
            <EditUserProfile />
          </Route> */}
        {/* <Route path="/users/:userId/readinglist" exact>
            <ReadingList />
          </Route>
          <Route path="/users/:userId/notifications" exact>
            <Notifications />
          </Route> */}
        {/* <Route path="/tags" exact>
            <Tags />
          </Route>
          <Route path="/tags/:tagName" exact>
            <Tag />
          </Route> */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/posts/new" element={<NewPost />} />
        {/* <Route path="/posts/:titleURL/:postId" exact>
            <Post />
          </Route>
          <Route path="/posts/:titleURL/:postId/edit" exact>
            <EditPost />
          </Route> */}
      </Routes>
      <Footer />
    </AppProviders>
  );
}

export default App;
