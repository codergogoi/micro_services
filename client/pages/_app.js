import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps }) => {
  return (
    <Header>
      <Component {...pageProps} />
    </Header>
  );
};

// AppComponent.getInitialProps = async (appContext) => {
//   const { data } = await buildClient(appContext.ctx).get(
//     '/api/users/currentuser'
//   );
//   return data;
// };

export default AppComponent;
