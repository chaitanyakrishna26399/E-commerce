// productController.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const ProductController = require("../controllers/index");
const Product = require('../models/productSchema');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Product Controller', () => {
  describe('searchProducts', () => {
    it('should return products matching the search term', async () => {
      const searchTerm = 'product';

      const products = [
        {
          _id: '1',
          name: 'Product 1',
          description: 'This is product 1',
          price: 10.99,
          variants: []
        },
        {
          _id: '2',
          name: 'Product 2',
          description: 'This is product 2',
          price: 19.99,
          variants: []
        }
      ];

      sinon.stub(Product, 'find').resolves(products);

      const req = {
        query: { tesxt: searchTerm }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await ProductController.SerchProduct(req, res);

      expect(res.status.calledOnceWithExactly(200)).to.be.true;
      expect(res.json.calledOnceWithExactly({
        status: true,
        message: 'Products found',
        data: products
      })).to.be.true;
    });

    it('should handle errors during product search', async () => {
      const searchTerm = 'product';

      const errorMessage = 'Database error';

      sinon.stub(Product, 'find').rejects(new Error(errorMessage));

      const req = {
        query: { text: searchTerm }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await ProductController.SerchProduct(req, res);

      expect(res.status.calledOnceWithExactly(500)).to.be.true;
      expect(res.json.calledOnceWithExactly({
        status: false,
        message: 'Server error',
        data: null
      })).to.be.true;
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const req = {
        body: {
          name: 'New Product',
          description: 'This is a new product',
          price: 9.99,
          variants: [
            {
              name: 'Variant 1',
              sku: 'SKU001',
              additionalCost: 2.5,
              stockCount: 10
            },
            {
              name: 'Variant 2',
              sku: 'SKU002',
              additionalCost: 5.0,
              stockCount: 5
            }
          ]
        }
      };

      const createdProduct = {
        _id: '60c76c211c67bb001f952b24',
        name: 'New Product',
        description: 'This is a new product',
        price: 9.99,
        variants: [
          {
            _id: '60c76c211c67bb001f952b25',
            name: 'Variant 1',
            sku: 'SKU001',
            additionalCost: 2.5,
            stockCount: 10
          },
          {
            _id: '60c76c211c67bb001f952b26',
            name: 'Variant 2',
            sku: 'SKU002',
            additionalCost: 5.0,
            stockCount: 5
          }
        ]
      };

      sinon.stub(Product, 'create').resolves(createdProduct);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await ProductController.Addproduct(req, res);

      expect(res.status.calledOnceWithExactly(201)).to.be.true;
      expect(res.json.calledOnceWithExactly(createdProduct)).to.be.true;
    });

    it('should handle errors during product creation', async () => {
      const req = {
        body: {
          name: 'New Product',
          description: 'This is a new product',
          price: 9.99,
          variants: [
            {
              name: 'Variant 1',
              sku: 'SKU001',
              additionalCost: 2.5,
              stockCount: 10
            }
          ]
        }
      };

      const errorMessage = 'Database error';

      sinon.restore(); // Restore original behavior of Product.create
      sinon.stub(Product, 'create').rejects(new Error(errorMessage));

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await ProductController.Addproduct(req, res);

      expect(res.status.calledOnceWithExactly(500)).to.be.true;
      expect(res.json.calledOnceWithExactly({ message: 'Error creating product' })).to.be.true;
    });
  });


});
