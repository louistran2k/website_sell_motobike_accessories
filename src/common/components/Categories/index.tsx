import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon1, Icon2, Icon3, Icon4, Icon5 } from 'assets/images';

type Props = {};

function Categories({}: Props) {
  return (
    <div className="nav-bar">
      <div className="categories">
        <MenuIcon />
        <span>Danh mục sản phẩm</span>
      </div>
      <ul className="menu">
        <li>
          <a href="">
            <img src={Icon1} alt="" />
            <h4>Đồ chơi xe máy</h4>
          </a>
          <ul className="sub-menu sm1">
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="">
            <img src={Icon2} alt="" />
            <h4>Phụ tùng thay thế</h4>
          </a>
          <ul className="sub-menu sm2">
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="">
            <img src={Icon3} alt="" />
            <h4>Lốp xe máy</h4>
          </a>
          <ul className="sub-menu sm3">
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="">
            <img src={Icon4} alt="" />
            <h4>Nhớt xe máy</h4>
          </a>
          <ul className="sub-menu sm4">
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="">
            <img src={Icon5} alt="" />
            <h4>Phụ kiện cho biker</h4>
          </a>
          <ul className="sub-menu sm5">
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
            <li>
              <a href="">Tay thắng + Phụ kiện</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
