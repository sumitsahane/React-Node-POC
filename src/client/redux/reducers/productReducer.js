import { GET_PRODUCT_LIST,CREATE_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT } from '../../redux/actions/productAction';

let dataState = { products: [], loading:true, success: false };

const productReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            state = Object.assign({}, state, { products: action.data, loading:false, success: true });
            return state;
        case CREATE_PRODUCT:
            var dataArr =  cloneObject(state.products) 
            dataArr.push(action.data);
            state = Object.assign({}, state, { products: dataArr, loading:false, success: true});
            return state;
        case UPDATE_PRODUCT:
            var updatedData = action.data;
            var dataArr =  cloneObject(state.products) 
            var index = getIndex(dataArr, updatedData._id); 
            if (index !== -1) {
                dataArr[index]['name'] = updatedData.name;
                dataArr[index]['price'] = updatedData.price;
            }
            state = Object.assign({}, state, { products: dataArr, loading:false, success: true});
            return state;
        case DELETE_PRODUCT:
            var dataArr =  cloneObject(state.products) 
            var index = getIndex(dataArr, action.id); 
            if(index !== -1) dataArr.splice(index, 1);
            state = Object.assign({}, state, { products: dataArr, loading:false, success: true});
            return state;
            
        default:
            return state;
    }
};


function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => (obj._id) === (id));
}

export default productReducer;

