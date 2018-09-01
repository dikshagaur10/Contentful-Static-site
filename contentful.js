const ACCESS_TOKEN =
  'ea374dbbab2bd03101c077589516f023f0661dded9f77a74dff508b3eb1429f4';
const SPACE_ID = 'ttyl0o1cdlvl';

const contentfulClient = contentful.createClient({
  accessToken: ACCESS_TOKEN,
  space: SPACE_ID
});

const PRODUCT_CONTENT_TYPE_ID = '2PqfXUJwE8qSYKuM0U6w8M';

document.addEventListener('DOMContentLoaded', event => {
  const container = document.getElementById('content');
  contentfulClient
    .getEntries({
      content_type: PRODUCT_CONTENT_TYPE_ID,
      order: '-sys.createdAt'
    })
    .then(entries => {
      container.innerHTML = renderProducts(entries.items);
    });
});

const renderProducts = products =>
  `<div class="products row">
		  ${products.map(renderSingleProduct).join('\n')}
		</div>`;

const renderSingleProduct = product => {
  const fields = product.fields;
  return `<div class="col-md-4 col-sm-6">
		<div class="product-in-list card mb-4 box-shadow">
		<div class="product-image card-img-top">
		  ${renderImage(fields.image[0])}
		</div>
		<div class="product-details card-body">
		  ${renderProductDetails(fields)}
		</div>
		</div>
		</div>`;
};

const renderProductDetails = fields =>
  `${renderProductHeader(fields)}
		<p class="product-categories">
		  ${fields.categories.map(category => category.fields.title).join(', ')}
		</p>
	    ${marked(fields.productDescription)}
		<p class="priceText">
		  ${fields.price} &euro;
		</p>
		<p><button type="button" class="btn btn-light">BUY NOW</button></p>`;

const renderProductHeader = fields =>
  `<div class="product-header">
		  <h2>
		    ${fields.productName}
		  </h2>
		    by ${fields.brand.fields.companyName}
	 </div>`;

const renderImage = image =>
  `<div class="image" style="background:url(https:${image.fields.file.url})">
  </div>`;
