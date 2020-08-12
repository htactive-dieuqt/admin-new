import React, { Component } from "react";
import "./Item.css";
import { connect } from "react-redux";
import { confirmDelete } from "../../../../utils/confirmer";
import { Button, Modal, ModalHeader } from "reactstrap";
import { deleteVoucher, getAllVoucher } from "../../../../redux/voucher/action";
import Moment from "react-moment";
import { deleteImage } from "../../../../api/media";
import VoucherEditForm from "../../form/VoucherEditForm";
import { getDataApi } from "../../../../api/apiCaller";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: "",
      voucher_code: "",
      sale_voucher: "",
      start_date: "",
      expired_date: "",
      description: "",
      modal: false,
      voucher: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    let {
      id,
      name,
      image,
      voucher_code,
      sale_voucher,
      start_date,
      expired_date,
      description,
    } = this.props.voucher;
    this.setState({
      id,
      name,
      image,
      voucher_code,
      sale_voucher,
      start_date,
      expired_date,
      description,
    });
  }

  onDelete = (id, image) => {
    let data = {
      image_url: image,
    };
    confirmDelete().then((result) => {
      const token = window.localStorage.getItem("userToken");
      if (result.value) {
        this.props.onDeleteVoucher(id, token);
        deleteImage(data, token);
      }
    });
  };

  onEdit = async (id) => {
    const token = await window.localStorage.getItem("userToken");
    const voucher = await getDataApi(`/voucher/${id}`, "GET", null, token);
    this.setState({
      modal: !this.state.modal,
      voucher: voucher,
    });
  };

  render() {
    const {
      id,
      name,
      image,
      voucher_code,
      sale_voucher,
      start_date,
      expired_date,
      description,
      voucher,
    } = this.state;

    return (
      <tr key={this.props.index}>
        <td className="text-center">{this.props.index}</td>
        <td className="text-center">{name}</td>
        <td className="text-center">{voucher_code}</td>
        <td className="text-center">{sale_voucher}</td>
        <td className="text-center">
          <img src={image} width="150" height="100" alt="voucher" />
        </td>
        <td className="text-center">
          <Moment format="DD-MM-YYYY">{start_date}</Moment>
        </td>
        <td className="text-center">
          <Moment format="DD-MM-YYYY">{expired_date}</Moment>
        </td>
        <td className="text-center">{description}</td>
        <td className="text-center">
          <span>
            <Button
              color="warning"
              className="mr-10"
              onClick={() => this.onEdit(id)}
            >
              <i className="fa fa-pencil"></i>
            </Button>
            <Modal
              isOpen={this.state.modal}
              fade={false}
              toggle={this.toggle}
              style={{ width: "100%", display: "block" }}
            >
              <ModalHeader toggle={this.toggle}>Edit Form</ModalHeader>
              <VoucherEditForm voucher={voucher} />
            </Modal>
            <Button color="danger" onClick={() => this.onDelete(id, image)}>
              <i className="fa fa-trash-o"></i>
            </Button>{" "}
            &nbsp;
          </span>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteVoucher: (id, token) => {
      dispatch(deleteVoucher(id, token));
    },
    fetchVouchers: (token) => {
      dispatch(getAllVoucher(token));
    },
  };
};

export default connect(null, mapDispatchToProps)(Item);
