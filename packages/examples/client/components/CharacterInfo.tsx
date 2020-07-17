import {connect} from 'react-redux';

const CharacterInfo = ({
                           character,
                           error,
                           fetchCharacter,
                           isFetchedOnServer = false
                       }) => (
    <div className="CharacterInfo">
        {error ? (
            <p>We encountered and error.</p>
        ) : (
            <article>
                <h3>Character: {character.name}</h3>
                <p>birth year: {character.birth_year}</p>
                <p>gender: {character.gender}</p>
                <p>skin color: {character.skin_color}</p>
                <p>eye color: {character.eye_color}</p>
            </article>
        )}
        <p>
            (was character fetched on server? - <b>{isFetchedOnServer.toString()})</b>
        </p>
    </div>
);

export default connect((state) => ({
    character: state.demo.character,
    error: state.demo.error,
    isFetchedOnServer: state.demo.isFetchedOnServer
}))(CharacterInfo);
