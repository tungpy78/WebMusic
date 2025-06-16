import { library } from '@fortawesome/fontawesome-svg-core';

// Bộ icon Solid (fas)
import {
    faChevronRight,
    faHouse,
    faTachometerAlt,
    faUsersCog,
    faHistory,
    faMusic,
    faTags,
    faUser,
    faCompactDisc,
    faToggleOff,
    faToggleOn,
    faMagnifyingGlass,
    faExpand,
    faCaretDown,
    faPen,           // <-- Thêm dòng này
    faTrash,
    faUndo,          // <-- Thêm dòng này
    faEye
} from '@fortawesome/free-solid-svg-icons';

// Bộ icon Regular (far)
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

// Bộ icon Brands (fab)
import { faDrupal } from '@fortawesome/free-brands-svg-icons';

// Đăng ký tất cả vào thư viện Font Awesome
library.add(
    faChevronRight,
    faHouse,
    faTachometerAlt,
    faUsersCog,
    faHistory,
    faMusic,
    faTags,
    faUser,
    faCompactDisc,
    faToggleOff,
    faToggleOn,
    faMagnifyingGlass,
    faExpand,
    faCaretDown,
    farBell,
    faDrupal,
    faPen,
    faTrash,
    faUndo,
    faEye
);
