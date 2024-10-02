import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  return (
    <main id="productDetail">
      <section className="proudctDetailSection">
        <div className="productDetailsWrapper flex items-center justify-center gap-3 flex-wrap">
          <div className="productImgWrapper flex items-center justify-start gap-2">
            <div className="productSubImages flex items-center flex-col gap-2">
              <div className="img_wrap flex-grow">
                <img src="" alt="Reload Page" />
              </div>
              <div className="img_wrap flex-grow">
                <img src="" alt="Reload Page" />
              </div>
              <div className="img_wrap flex-grow">
                <img src="" alt="Reload Page" />
              </div>
              <div className="img_wrap flex-grow">
                <img src="" alt="Reload Page" />
              </div>
            </div>
            <div className="img_wrap">
              <img src="" alt="Reload Page" />
            </div>
          </div>
          <div className="content_wrap">
            <h5 className="lg:text-[18px] text-black md:text-[16px] capitalize"></h5>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
