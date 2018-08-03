import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import "./app.css";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

import {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct
} from "../redux/actions/productAction";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  listItem: {
    width: "5%"
  },
  success: {
    backgroundColor: green[600]
  },
  deleteIconColor: {
    backgroundColor: "#FAFAFA",
    color: red[500]
  },
  editIconColor: {
    backgroundColor: "#FAFAFA",
    color: lightBlue[500]
  },
  addIconColor: {
    backgroundColor: "#FAFAFA",
    color: "#00C853"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isAdd: 1,
      editObj: { name: "", price: "" },
      openMsg: false,
      message: ""
    };
  }

  handleClickOpen = (flag, product) => {
    if (!flag) {
      this.setState({ editObj: product });
    } else {
      this.setState({ editObj: { name: "", price: "" } });
    }
    this.setState({ isAdd: flag });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = pObj => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      this.setState({ isAdd: 2 });
      this.props.deleteProduct(pObj._id);
    }
  };

  handleChange(event) {
    var target = event.target;
    var obj = Object.assign({}, this.state.editObj);
    if (target.id === "name") {
      obj.name = target.value;
    } else {
      obj.price = target.value;
    }
    this.setState({ editObj: obj });
  }

  saveProduct() {
    if (this.state.isAdd) {
      this.props.createProduct(this.state.editObj);
      this.setState({ open: false });
    } else {
      this.props.updateProduct(this.state.editObj);
      this.setState({ open: false });
    }
  }

  handleMsgClose = () => {
    this.setState({ openMsg: false });
  };

  componentDidMount() {
    this.props.getProductList();
  }

  componentWillReceiveProps() {
    if (this.props.success) {
      if (this.state.isAdd == 1) {
        this.setState({ message: "Product added successfully." });
      } else if (this.state.isAdd == 0) {
        this.setState({ message: "Product updated successfully." });
      } else {
        this.setState({ message: "Product deleted successfully." });
      }
      this.setState({ openMsg: true });
    }
  }

  render() {
    const { classes } = this.props;
    if (this.props.products.length == 0) {
      return (
        <CircularProgress className={classes.progress} color="secondary" />
      );
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              Product Details
            </Typography>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <ListItemText
                    className={classes.listItem}
                    primary={
                      <Typography variant="title" gutterBottom>
                        Product
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={
                      <Typography variant="title" gutterBottom>
                        Price
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Add" placement="right">
                      <IconButton
                        style={{ marginRight: "20px" }}
                        aria-label="Add"
                        onClick={() => this.handleClickOpen(1)}
                        className={classes.addIconColor}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider style={{ marginBottom: "10px" }} />
                {this.props.products.map(product => (
                  <ListItem key={product._id} style={{ marginBottom: "5px" }}>
                    <ListItemText
                      className={classes.listItem}
                      primary={product.name}
                    />
                    <ListItemText primary={"\u20B9" + product.price} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit" placement="left">
                        <IconButton
                          style={{ marginRight: "5px" }}
                          className={classes.editIconColor}
                          aria-label="Edit"
                          onClick={() => this.handleClickOpen(0, product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="right">
                        <IconButton
                          className={classes.deleteIconColor}
                          aria-label="Delete"
                          onClick={() => this.handleDelete(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.isAdd ? "Add New Product" : "Edit Product"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={this.state.editObj.name}
              onChange={e => this.handleChange(e)}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="price"
              label="Price"
              type="number"
              value={this.state.editObj.price}
              onChange={e => this.handleChange(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.saveProduct()} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          className={classes.success.isRequired}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.openMsg}
          onClose={this.handleMsgClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    success: state.products.success,
    loading: state.products.loading,
    products: state.products.products
  };
}

function bindAction(dispatch) {
  return {
    getProductList: () => dispatch(getProductList()),
    createProduct: obj => dispatch(createProduct(obj)),
    updateProduct: obj => dispatch(updateProduct(obj)),
    deleteProduct: id => dispatch(deleteProduct(id))
  };
}

//Connect everything
// export default (connect(mapStateToProps,bindAction))(withStyles(styles))(App);
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    bindAction
  )
)(App);
