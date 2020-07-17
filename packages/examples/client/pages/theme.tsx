import Link from 'next/link';
import {useTheme} from '@material-ui/core/styles';

const themePage = () => {
    const theme = useTheme();
    return <span>{`spacing ${theme.spacing()}`}</span>;
};

export default themePage;
