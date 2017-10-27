package com.react_native_demo;

import android.graphics.Color;
import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.react_native_demo.utils.StatusBarCompat;

public class MainActivity extends ReactActivity {

    //声明一个long类型变量：用于存放上一点击“返回键”的时刻
    private long mExitTime;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "react_native_demo";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StatusBarCompat.compat(this, Color.parseColor("#6A6AFF"));
    }


//    @Override
//    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        //判断用户是否点击了“返回键”
//        if (keyCode == KeyEvent.KEYCODE_BACK) {
//            //与上次点击返回键时刻作差
//            if ((System.currentTimeMillis() - mExitTime) > 2000) {
//                //大于2000ms则认为是误操作，使用Toast进行提示
//                Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
//                //并记录下本次点击“返回键”的时刻，以便下次进行判断
//                mExitTime = System.currentTimeMillis();
//            } else {
//                //小于2000ms则认为是用户确实希望退出程序-调用System.exit()方法进行退出
//                System.exit(0);
//            }
//            return true;
//        }
//        return super.onKeyDown(keyCode, event);
//    }
}
