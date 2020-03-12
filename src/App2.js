import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import {
  fetchPeople,
  fetchMorePeople,
  addPerson,
  deletePerson,
  updatePerson
} from './actions/gallery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      update: false,
      value: '',
      isEditing: {
        id: -1,
        name: ''
      },
      tambah: {
        id: 999,
        name: ''
      }
    };
  }
  componentDidMount() {
    this.props.fetchPeople();
  }
  // handleChange(event) {
  //   alert(event.target.value);
  //   this.setState({ value: event.target.value });
  // }

  editOnChange = (e, id) => {
    this.setState({ [e.target.name]: { id, name: e.target.value } });
  };

  addOnChange = (e, id) => {
    // alert(e.target.value);
    this.setState({ [e.target.name]: { name: e.target.value, id } });
    // console.log(this.state.value);
  };
  render() {
    const {
      people,
      loading,
      fetchMorePeople,
      addPerson,
      deletePerson,
      updatePerson
    } = this.props;
    const { value, isEditing, tambah } = this.state;

    console.log(this.state.update, 'INSIDE');
    let input;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <input
              type="text"
              // value={isEditing.name}
              name="tambah"
              onChange={e => this.addOnChange(e, tambah.id)}
            />
            <button
              onClick={() => {
                addPerson(tambah);
              }}
            >
              Add name
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <tr>
                <td>Nama</td>
                <td colpan="2">Action</td>
                <td></td>
              </tr>
              {people.map(t => (
                <tr key={t.id}>
                  <td
                    onClick={() =>
                      this.setState({ isEditing: { id: t.id, name: t.name } })
                    }
                  >
                    {t.tipe}
                    <img src={t.src} />
                  </td>

                  <td onClick={() => deletePerson(t.id)}>Delete</td>
                  <td
                    onClick={() =>
                      this.setState({ isEditing: { id: t.id, name: t.name } })
                    }
                  >
                    Edit
                  </td>
                  {isEditing.id === t.id && (
                    <div>
                      <input
                        type="text"
                        value={isEditing.name}
                        name="isEditing"
                        onChange={e => this.editOnChange(e, t.id)}
                      />
                      <button
                        onClick={() => {
                          updatePerson(isEditing);
                          this.setState({
                            isEditing: {
                              id: -1,
                              name: ''
                            }
                          });
                        }}
                      >
                        Edit name
                      </button>
                    </div>
                  )}
                </tr>
              ))}
            </table>
          )}
          <button
            onClick={() => {
              this.setState(
                state => ({ page: state.page + 1 }),
                () => {
                  fetchMorePeople(this.state.page);
                }
              );
            }}
          >
            Add More
          </button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.starwars.people, 'TESTT');
  return {
    loading: state.starwars.loading,
    people: state.starwars.people,
    errorMessage: state.starwars.errorMessage,
    update: state.starwars.update
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPeople: page => dispatch(fetchPeople(page)),
  fetchMorePeople: page => dispatch(fetchMorePeople(page)),
  deletePerson: id => dispatch(deletePerson(id)),
  updatePerson: (id, name) => dispatch(updatePerson(id, name)),
  addPerson: (id, name) => dispatch(addPerson(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
