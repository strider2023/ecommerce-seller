import React from 'react';
import AppTable from '../common/components/AppTable';
import AppContainer from '../containers/AppContainer';
import cookie from "cookie";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import ServerError from '../common/components/ServerError';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Notiflix from 'notiflix';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';

const DELETE_COLLECTION = gql`
mutation ($id: ID!) { 
  deleteBrandVideo(input: { id: $id }) { 
        code, msg
  } 
}
`;

function Branding({ collections }) {
  const router = useRouter();

  const [deleteBrandVideo] = useMutation(DELETE_COLLECTION, {
    onCompleted: (data) => {
      Notiflix.Notify.success('Collection item removed successfully.', { position: "left-bottom", });
      router.reload();
    },
    onError: () => {
      Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
    },
    context: {
      headers: {
        "uuid": cookieCutter.get('auth_token')
      }
    }
  });

  const CREATOR_COLLECTIONS_TABLE = {
    title: "Collections",
    defaultOrder: "asc",
    defaultOrderColumn: "title",
    primaryRowKey: "id",
    defaultPage: 0,
    defaultRowsPerPage: 10,
    showCreate: true,
    createURL: "/collection/creator",
    onClickURL: "",
    headCells: [
      { id: 'imageUrl', type: 'IMAGE', label: 'Image' },
      { id: 'title', type: 'TEXT', label: 'Name' },
      { id: 'showSubType', type: 'TEXT', label: 'Type' },
      { id: 'likes', type: 'TEXT', label: 'Likes' },
      { id: 'messageCount', type: 'TEXT', label: 'Messages' },
      // {
      //   id: 'id', type: 'BUTTON', label: '', icon: <CreateRoundedIcon />,
      //   onButtonClick: (e, item) => {
      //     e.preventDefault();
      //   }
      // },
      {
        id: 'id', type: 'BUTTON', label: '', icon: <DeleteRoundedIcon />,
        onButtonClick: (e, item) => {
          e.preventDefault();
          Notiflix.Confirm.show('Confirm', 'Are you sure you want to delete this collection?',
            'Yes', 'No',
            () => {
              deleteBrandVideo({ variables: { id: item.toString() } });
            }, () => { }, {},
          );
        }
      }
    ]
  }

  return (
    <AppContainer>
      {collections && <AppTable {...CREATOR_COLLECTIONS_TABLE} tableData={collections.result || []} />}
      {!collections && <ServerError />}
    </AppContainer>
  )
}

export async function getServerSideProps(context) {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_LEHLAH_BACKEND_GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(),
    });
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const { data } = await client.query({
      query: gql`
      {getMyBrandVideos(input: {paginationOffset:  "null",}){result{id, messageCount,title, imageUrl, videoUrl, lang,likes,showSubType,products{title,prd_id,image_url,sold}} paginationOffset}}
      `,
      context: {
        headers: {
          "uuid": cookies['auth_token']
        }
      },
    });

    return {
      props: {
        collections: data.getMyBrandVideos,
      }
    };
  } catch (e) {
    return {
      props: { collections: null },
    }
  }
}

export default Branding