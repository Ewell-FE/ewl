import {Button} from '@ewl/core';

export default () => (
    <div>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
            Primary
        </Button>
        <Button variant="contained" color="secondary">
            Secondary
        </Button>
        <Button variant="contained" disabled>
            Disabled
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
            Link
        </Button>
        <br />
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" color="primary">
            Primary
        </Button>
        <Button variant="outlined" color="secondary">
            Secondary
        </Button>
        <Button variant="outlined" disabled>
            Disabled
        </Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">
            Link
        </Button>
    </div>
);
