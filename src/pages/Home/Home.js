import React, { useState, useEffect, useContext } from 'react'
import Posts from '../../components/Post/Posts'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import useHttpClient from '../../hooks/useHttpClient'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import Layout from '../../components/Layout/Layout'

const Home = () => {
  const [tags, setTags] = useState([])
  const { sendReq, isLoading } = useHttpClient()

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       const responseData = await sendReq(`${process.env.REACT_APP_BASE_URL}/tags/home`);
  //       setTags(responseData.tags);
  //     } catch (err) {}
  //   };
  //   fetchTags();
  // }, [sendReq]);

  return (
    <Layout>
      <Posts cover={true} />
      {/* <RightSideBar tags={tags} isLoading={isLoading} /> */}
    </Layout>
  )
}

export default Home
