import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//Main layout
import Home from './pages/Home';
import AccountCategory from './pages/Account/Category';
import AccountDetail from './pages/Account/Detail';
import AccountList from './pages/Account/List';
import TaskList from './pages/Task/List';
import MemberList from './pages/Member/List';
import TaskProgress from './pages/Task/Progress';
import TaskComment from './pages/Task/Comment';
import TaskTarget from './pages/Task/Target';
import Report from './pages/Report/Report';

import TaskAddPlan from './pages/Task/AddPlan';
import TastAddDetailPlan from './pages/Task/AddDetailPlan';

//Basic layout
import LockScreen from './pages/Authencation/LockScreen';
import SignIn from './pages/Authencation/SignIn';
import SignedOut from './pages/Authencation/SignedOut';
//Cover layout
import PasswordChange from './pages/Authencation/PasswordChange';
import PasswordReset from './pages/Authencation/PasswordReset';
import SignInSuccess from './pages/Authencation/SignInSuccess';

const App = () => {
    return (
        <Router>
            <Routes>
                {/*Home*/}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/*Account*/}
                <Route path="/account-category" element={<AccountCategory />} /> {/* Thể loại tài khoản + thêm mới */}
                <Route path="/account-category/:id" element={<AccountCategory />} /> {/* Thể loại tài khoản + chỉnh sửa */}

                <Route path="/account-list" element={<AccountList />} /> {/* Danh sách tài khoản */}

                <Route path="/account-add" element={<AccountDetail mode="add" />} /> {/* Thêm tài khoản */}
                <Route path="/account-view/:id" element={<AccountDetail mode="view" />} /> {/* Xem tài khoản */}
                <Route path="/account-edit/:id" element={<AccountDetail mode="edit" />} /> {/* Chỉnh sửa tài khoản */}

                {/*Task*/}
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/task-progress" element={<TaskProgress />} />
                <Route path="/task-comment" element={<TaskComment />} />
                <Route path="/task-target" element={<TaskTarget />} />
              
                <Route path="/task-add-plan" element={<TaskAddPlan />} />
                <Route path="/task-add-detail-plan" element={<TastAddDetailPlan />} />


                {/*Member*/}
                <Route path="/member-list" element={<MemberList />} />

                {/*Report*/}
                <Route path="/report" element={<Report />} />
                {/*Authencation-Basic*/}
                <Route path="/lock-screen" element={<LockScreen />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/signed-out" element={<SignedOut />} />
                {/*Authencation-Cover*/}
                <Route path="/password-change" element={<PasswordChange />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="/sign-in-success" element={<SignInSuccess />} />
            </Routes>
        </Router>
    );
};

export default App;
