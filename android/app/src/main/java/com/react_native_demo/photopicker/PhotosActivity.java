package com.react_native_demo.photopicker;

import android.app.ProgressDialog;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Color;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.react_native_demo.MainActivity;
import com.react_native_demo.R;
import com.react_native_demo.photopicker.adapter.ImageAdapter;
import com.react_native_demo.photopicker.constant.Const;
import com.react_native_demo.utils.StatusBarCompat;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Delayed;

public class PhotosActivity extends AppCompatActivity implements View.OnClickListener {

    private Toolbar mToolbar;
    private ImageView mIv_back;
    private TextView mTv_done;
    private GridView mGv_photo;
    private ProgressDialog mProgressDialog;
    private static final String TAG = "PhotosActivity";


    /**
     * 所有的图片
     */
    private List<String> mImgs = new ArrayList<>();

    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 0x110:
                    mProgressDialog.dismiss();
                    //主线程设置适配器
                    mImageAdapter = new ImageAdapter(PhotosActivity.this, mImgs);
                    mGv_photo.setAdapter(mImageAdapter);

                    mImageAdapter.setOnItemSelectNumListener(new ImageAdapter.OnItemSelectNumListener() {
                        @Override
                        public void onItemSelectNum(int size) {
                            mTv_done.setText("完成(" + size + ")");
                        }
                    });
                    mGv_photo.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
                            Intent intent = new Intent(PhotosActivity.this, BigImageActivity.class);
                            intent.putStringArrayListExtra(Const.DATA_TO_PHOTO_VIEW, (ArrayList<String>) mImgs);
                            intent.putExtra(Const.FIRSTR_INDEX,position);
                            startActivity(intent);
                        }
                    });

            }
        }
    };
    private ImageAdapter mImageAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StatusBarCompat.compat(this, Color.parseColor("#313237"));
        setContentView(R.layout.activity_photos);

        initView();
        initData();

    }


    private void initData() {
        //扫描SD卡获取图片
        if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
            Toast.makeText(this, "当前存储卡不可用", Toast.LENGTH_SHORT).show();
            return;
        }

        mProgressDialog = ProgressDialog.show(this, null, "数据加载中...");


        //读取SD卡中图片
        new Thread(new Runnable() {
            @Override
            public void run() {
                String firstImage = null;
                ContentResolver mContentResolver = PhotosActivity.this
                        .getContentResolver();

                // 只查询jpeg和png的图片
                Cursor mCursor = mContentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, null,
                        MediaStore.Images.Media.MIME_TYPE + "= ? or " + MediaStore.Images.Media.MIME_TYPE + "= ?",
                        new String[]{"image/jpeg", "image/png"}, MediaStore.Images.Media.DATE_ADDED);

                while (mCursor.moveToNext()) {
                    String path = mCursor.getString(mCursor.getColumnIndex(MediaStore.Images.Media.DATA));
                    mImgs.add(path);
                }
                mCursor.close();
                Log.i(TAG, "run: " + mImgs.size());
            }
        }).start();


        mHandler.sendEmptyMessage(0x110);
    }

    private void initView() {

        mIv_back = (ImageView) findViewById(R.id.iv_back);
        mTv_done = (TextView) findViewById(R.id.tv_done);
        mGv_photo = (GridView) findViewById(R.id.gv_photo);

        mIv_back.setOnClickListener(this);
        mTv_done.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.tv_done:
                Intent intent = new Intent();
                intent.putStringArrayListExtra("mImgs", (ArrayList<String>) mImageAdapter.getImages());
                setResult(RESULT_OK, intent);
                finish();
                break;
        }
    }
}
