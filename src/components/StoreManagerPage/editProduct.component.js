import React, {Component} from 'react';
//To keep connectivity between frontend 'ReactJS' and backend 'NodeJS', we import axios
import axios from 'axios';

export default class EditProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/edit/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_id : response.data.product_id,
                    product_name : response.data.product_name,
                    product_price : response.data.product_price,
                    product_discount : response.data.product_discount
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeProductId(e){
        this.setState({
            product_id: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductDiscount(e){
        this.setState({
            product_discount: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            product_id : this.state.product_id,
            product_name : this.state.product_name,
            product_price : this.state.product_price,
            product_discount : this.state.product_discount
        };

        axios.post('http://localhost:4000/product/update/' +this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/guest');
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Product ID :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_id}
                               onChange={this.onChangeProductId}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_name}
                               onChange={this.onChangeProductName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Price :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_price}
                               onChange={this.onChangeProductPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Discount :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_discount}
                               onChange={this.onChangeProductDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Discount" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
