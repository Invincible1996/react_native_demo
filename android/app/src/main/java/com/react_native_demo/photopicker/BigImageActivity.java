package com.react_native_demo.photopicker;

import android.animation.ObjectAnimator;
import android.content.Intent;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.AnimationUtils;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

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
    private ImageView mIv_back;
    private TextView mTv_count;
    private int firstIndex = -1;
    private boolean isShowHeader = true;

    private static final String TAG = "BigImageActivity";
    private BigImageAdapter mAdaper;
    private RelativeLayout mRl_header;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_big_image);


        initView();
        initData();

        mIv_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        //初始化index
        mTv_count.setText(firstIndex + 1 + "/" + mImgList.size());
        mAdaper = new BigImageAdapter(mImgList, this);


        mViewPager.setAdapter(mAdaper);

        mViewPager.setCurrentItem(firstIndex);
        mAdaper.setOnItemClickListener(new BigImageAdapter.OnItemClickListener() {
            @Override
            public void onItemClick() {
                if (isShowHeader) {

                    mRl_header.setVisibility(View.INVISIBLE);

                } else {
                    mRl_header.setVisibility(View.VISIBLE);
                }

                isShowHeader = !isShowHeader;
            }
        });


        mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                Log.d(TAG, "onPageSelected: " + position);
                mTv_count.setText(position + 1 + "/" + mImgList.size());
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

    }

    private void initView() {
        mViewPager = (ViewPager) findViewById(R.id.viewpager);
        mRl_header = (RelativeLayout) findViewById(R.id.rl_header);
        mIv_back = (ImageView) findViewById(R.id.iv_back);
        mTv_count = (TextView) findViewById(R.id.tv_count);
    }

    private void initData() {
        Intent intent = getIntent();
        List<String> data = intent.getStringArrayListExtra(Const.LIST_FROM_RN);
        firstIndex = intent.getIntExtra(Const.FIRSTR_INDEX, 0);
        mImgList.addAll(data);
    }
}
