package com.react_native_demo.photopicker;

import android.content.Intent;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.react_native_demo.R;
import com.react_native_demo.photopicker.adapter.BigImageAdapter;
import com.react_native_demo.photopicker.constant.Const;

import java.util.ArrayList;
import java.util.List;

import uk.co.senab.photoview.PhotoView;

public class BigImageActivity extends AppCompatActivity {

    private PhotoView mPhotoView;
    private ViewPager mViewPager;
    private List<String> mImgList = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_big_image);

        initData();
        mViewPager = (ViewPager) findViewById(R.id.viewpager);
        mViewPager.setAdapter(new BigImageAdapter(mImgList, this));

    }

    private void initData() {
        Intent intent = getIntent();
        List<String> data = intent.getStringArrayListExtra(Const.DATA_TO_PHOTO_VIEW);
        mImgList.addAll(data);
    }
}
