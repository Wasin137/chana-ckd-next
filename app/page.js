import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import Welcome from './Welcome';
import FirstPageComment from './components/FirstPageComment';

export default function Home({ comments }) {
    return (
        <Container>
            <Row className='p-2 d-flex justify-content-center'>
                <Welcome />
            </Row>
            <Row className='mt-2'>
                <FirstPageComment comments={comments} />
            </Row>
        </Container>
    );
}

const baseUrl_api = "https://chana-ckd-api.vercel.app";

export async function getServerSideProps(context) {
    const res = await fetch(`${baseUrl_api}/api/comments/firstpage`, {
        cache: 'no-store',
    });

    const data = await res.json();

    return {
        props: {
            comments: data.comments || []
        }
    };
}
