import React, { Component } from 'react';
import './item.css';
import { connect } from 'react-redux';
import { confirmDelete } from '../../../../utils/confirmer';
import { Button } from 'reactstrap';
import {updateDistrict, deleteDistrict, getAllDistrict} from '../../../../redux/district/action';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      editing: false
    };
  }

  componentDidMount() {
    let { id, name, description } = this.props.district;
    this.setState({
      id,
      name,
      description
    })
  }

  componentWillReceiveProps (nextProps) {
    let { id, name, description } = nextProps.district;
    this.setState({
      id,
      name,
      description
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  onUpdate = () => {
    this.setState({
      editing: false
    });
    const token = window.localStorage.getItem('userToken');
    let { id, name, description } = this.state;
    if (this.props.district.name !== name || this.props.district.description !== description) {
      this.props.onUpdateDistrict({ id, name, description }, token);
    }
    this.props.fetchDistricts(token);
  }

  onCancelUpdate = () => {
    this.setState({
      editing: false
    });
    let { name, description } = this.props.district;
    if (name !== this.state.name || description !== this.state.description) {
      this.setState({
        name,
        description
      });
    }
  }

  onDelete = (id) => {
    confirmDelete().then((result) => {
      const token = window.localStorage.getItem('userToken');
      if (result.value) {
        this.props.onDeleteDistrict(id, token);
      }
    })
  }

  render() {
    const { id, name, description, editing } = this.state;
    return (
      <tr>
        <td className="text-center">{this.props.index}</td>
        <td>
          <input type="text" name="name" className={editing ? 'editing' : 'border-none'} onChange={this.onChange} value={name || ''} readOnly={editing ? false : true} />
        </td>
        <td>
          <input type="text" name="description" className={editing ? 'editing' : 'border-none'} onChange={this.onChange} value={description || ''} readOnly={editing ? false : true} />
        </td>
        <td className="text-center">
          {editing ?
            <span>
              <Button color="success" className="mr-10" onClick={this.onUpdate}><i className="fa fa-floppy-o"></i></Button>
              <Button color="secondary" className="mr-10" onClick={this.onCancelUpdate}><i className="fa fa-ban"></i></Button>
            </span> :
            <Button color="warning" className="mr-10" onClick={this.onEdit}><i className="fa fa-pencil"></i></Button>
          }
          <Button color="danger" onClick={() => this.onDelete(id)}><i className="fa fa-trash-o"></i></Button> &nbsp;
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateDistrict: (district, token) => {
      dispatch(updateDistrict(district, token))
    },
    onDeleteDistrict: (id, token) => {
      dispatch(deleteDistrict(id, token))
    },
    fetchDistricts: (token) => {
      dispatch(getAllDistrict(token));
    },
  }
}

export default connect(null, mapDispatchToProps)(Item);