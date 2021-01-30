/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
    // <pre style={{ color: 'black' }}>
    //   {JSON.stringify(dbExterno.questions, null, 4)}
    // </pre>
  );
}

export async function getServerSideProps(context) {
  // http://localhost:3000/quiz/qualquercoisa?name=Paulo
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
    // .catch((err) => {
    //   console.error('err', err);
    // });

    // console.log('dbExterno', dbExterno);
    // console.log('infos que o Next dá para nós', context.query.id);

    return {
      props: {
        dbExterno,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    // redirect ...
    // context.rex.
    throw new Error(error);
  }
}
