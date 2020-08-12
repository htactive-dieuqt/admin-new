import React, { Component } from 'react';
import './Item.css';
import { connect } from 'react-redux';
import { confirmDelete } from '../../../../utils/confirmer';
import { 
    Button, 
    Modal,
    ModalHeader, 
} from 'reactstrap';
import {deleteSite, getAllSite} from '../../../../redux/site/action';
import { deleteImage } from "../../../../api/media";
import SiteEditForm from './../../form/SiteEditForm';
import { getDataApi } from '../../../../api/apiCaller';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            site_category_id: '',
            district_id: '',
            total_rating: '',
            address_latitude: '',
            address_longitude: '',
            description: '',
            modal: false,
            site : [],
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        let { id, name, image, site_category_id, district_id, total_rating, address_latitude, address_longitude, description } = this.props.site;
        this.setState({
            id,
            name,
            image,
            site_category_id,
            district_id,
            total_rating,
            address_latitude,
            address_longitude,
            description
        })
    }

    onDelete = (id, image) => {
        console.log(id);
        
        let data = {
            image_url: image,
        };
        confirmDelete().then((result) => {
            const token = window.localStorage.getItem('userToken');
            if (result.value) {
                this.props.onDeleteSite(id, token);                
                deleteImage(data, token);
            }
        })
    }

    onEdit = async (id) => {
        const token = await window.localStorage.getItem('userToken');
        const site = await getDataApi(`/tourist-site/${id}`, 'GET', null, token);
        this.setState({
            modal: !this.state.modal,
            site: site,
        });
    }

    render() {
        const { id, name, image, site_category_id, district_id, total_rating, address_latitude, address_longitude, description, site } = this.state;
        return (
            <tr key={this.props.index}>
                <td className="text-center">{this.props.index}</td>
                <td className="text-center">{name}</td>
                <td className="text-center">{district_id}</td>
                <td className="text-center">{site_category_id}</td>
                <td className="text-center"><img src={image} width="150" height="100" alt="site" /></td>
                <td className="text-center">{address_latitude}</td>
                <td className="text-center">{address_longitude}</td>
                <td className="text-center">{total_rating}</td>
                <td className="text-center">{description}</td>
                <td className="text-center">
                    <span>
                        <Button color="warning" className="mr-10" onClick={()=>this.onEdit(id)}><i className="fa fa-pencil"></i></Button>
                        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} style={{ width: "100%", display: "block" }}>
                            <ModalHeader toggle={this.toggle}>
                                Edit Form
                            </ModalHeader>
                            <SiteEditForm
                                site={site}
                            />
                        </Modal>
                        <Button color="danger" onClick={() => this.onDelete(id, image)}><i className="fa fa-trash-o"></i></Button> &nbsp;
                    </span> 
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteSite: (id, token) => {
            dispatch(deleteSite(id, token));
        },
        fetchSites: (token) => {
            dispatch(getAllSite(token));
        },
    }
}

export default connect(null, mapDispatchToProps)(Item);