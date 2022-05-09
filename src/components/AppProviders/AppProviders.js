import React, { useState } from 'react';
import { SearchContext } from '../../context/search';
import '../../styles/main.css';
import { ThirdPartyEmailPasswordAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

const AppProviders = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <ThirdPartyEmailPasswordAuth requireAuth={false}>
      <SearchContext.Provider
        value={{
          searchValue,
          setSearchValue,
          searchResults,
          setSearchResults
        }}>
        {children}
      </SearchContext.Provider>
    </ThirdPartyEmailPasswordAuth>
  );
};

export default AppProviders;
