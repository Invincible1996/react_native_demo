package com.react_native_demo.photopicker;

import android.app.ProgressDialog;
import android.content.AsyncQueryHandler;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.react_native_demo.R;
import com.react_native_demo.photopicker.adapter.ImageAdapter;
import com.react_native_demo.photopicker.adapter.PhotosAdapter;
import com.react_native_demo.photopicker.bean.ImgFolderBean;
import com.react_native_demo.photopicker.constant.Const;
import com.react_native_demo.photopicker.view.ListViewPopupWindow;
import com.react_native_demo.utils.StatusBarCompat;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PhotosActivity extends AppCompatActivity implements View.OnClickListener {


    private ImageView mIv_back;
    private TextView mTv_done;
    private GridView mGv_photo;
    private ProgressDialog mProgressDialog;
    private RelativeLayout mBottom_layout;
    private TextView mBottom_choose_dir;
    private TextView mTv_totalCount;
    private static final String TAG = "PhotosActivity";
    private ImageAdapter mImageAdapter;

    private int totalCount;

    private File mCurrentDir;

    /**
     * 所有文件夹的集合
     */
    private List<ImgFolderBean> mFolderBeen = new ArrayList<>();

    private ListViewPopupWindow mListPopupWindow;
    private int mMaxCount = -1;


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

                    //比较从前一个界面传过来的集合，如果相同则设置选中
                    Intent intent = getIntent();
                    List<String> list_from_rn = intent.getStringArrayListExtra(Const.LIST_FROM_RN);

                    if (mCurrentDir == null) {
                        Toast.makeText(PhotosActivity.this, "一张图片都没扫到哦！！", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    System.out.println(mCurrentDir + "------");
                    mImgs = Arrays.asList(mCurrentDir.list());
                    mTv_totalCount.setText(mImgs.size() + "");

                    Log.d(TAG, mImgs.size() + " ");

                    //主线程设置适配器
                    if (mImageAdapter == null) {

                        mImageAdapter = new ImageAdapter(PhotosActivity.this, mImgs, list_from_rn, mCurrentDir.getAbsolutePath());
                    } else {
                        mImageAdapter.notifyDataSetChanged();
                    }

                    mGv_photo.setAdapter(mImageAdapter);
                    if (list_from_rn != null && list_from_rn.size() > 0) {

                        mTv_done.setText("完成(" + list_from_rn.size() + ")");
                    }
                    mImageAdapter.setOnItemSelectNumListener(new ImageAdapter.OnItemSelectNumListener() {
                        @Override
                        public void onItemSelectNum(int size) {
                            mTv_done.setText("完成(" + size + ")");
                        }
                    });

                    initDirPopupWindow();
                    initEvent();

            }
        }
    };
    private TextView mTv_title;
    private Button mBt_preview;

    /**
     * popupWindow的事件
     */
    private void initEvent() {
        mBottom_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mListPopupWindow.setAnimationStyle(R.style.dir_popup_window_anim);
                mListPopupWindow.showAsDropDown(mBottom_layout, 0, 0);

                lightOff();
            }
        });
    }


    /**
     * 内容区变暗
     */
    private void lightOff() {
        WindowManager.LayoutParams lp = getWindow().getAttributes();
        lp.alpha = 0.3f;
        getWindow().setAttributes(lp);
    }


    /**
     * 初始化popupWindow
     */
    private void initDirPopupWindow() {

        mListPopupWindow = new ListViewPopupWindow(this, mFolderBeen);
        mListPopupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                lightOn();
            }
        });

        mListPopupWindow.setOnPopupItemOnClickLisenter(new ListViewPopupWindow.OnPopupItemOnClickLisenter() {
            @Override
            public void onItemClick(ImgFolderBean imgFolderBean) {
                mCurrentDir = new File(imgFolderBean.getDir());
                mImgs = Arrays.asList(mCurrentDir.list(new FilenameFilter() {
                    @Override
                    public boolean accept(File file, String fileName) {
                        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
                            return true;
                        }
                        return false;
                    }

                }));

                mImageAdapter = new ImageAdapter(PhotosActivity.this, mImgs, null, mCurrentDir.getAbsolutePath());

                mGv_photo.setAdapter(mImageAdapter);

                mTv_totalCount.setText(mImgs.size() + "");
                mTv_done.setText("完成");
                mImageAdapter.setOnItemSelectNumListener(new ImageAdapter.OnItemSelectNumListener() {
                    @Override
                    public void onItemSelectNum(int size) {
                        mTv_done.setText("完成(" + size + ")");
                    }
                });
                mBottom_choose_dir.setText(imgFolderBean.getName());

                mListPopupWindow.dismiss();

            }

        });


    }

    /**
     * 内容区域变亮
     */
    private void lightOn() {
        WindowManager.LayoutParams lp = getWindow().getAttributes();
        lp.alpha = 1.0f;
        getWindow().setAttributes(lp);
    }


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

//        PhotosQueryHandler mQueryHandler = new PhotosQueryHandler(getContentResolver());
//
//        String[] projection = null;
//        String selection = MediaStore.Images.Media.MIME_TYPE + "= ? or " + MediaStore.Images.Media.MIME_TYPE + "= ?";
//        String[] selectionArgs = new String[]{"image/jpeg", "image/png"};
//        String orderBy = MediaStore.Images.Media.DATE_MODIFIED;
//
//        PhotosAdapter adapter = new PhotosAdapter(this, null);
//
//        mQueryHandler.startQuery(0, adapter,
//                MediaStore.Images.Media.EXTERNAL_CONTENT_URI, null,
//                MediaStore.Images.Media.MIME_TYPE + "= ? or " + MediaStore.Images.Media.MIME_TYPE + "= ?",
//                new String[]{"image/jpeg", "image/png"}, MediaStore.Images.Media.DATE_MODIFIED);


        //读取SD卡中图片
        new Thread(new Runnable() {
            @Override
            public void run() {
                ContentResolver mContentResolver = PhotosActivity.this
                        .getContentResolver();

                // 只查询jpeg和png的图片
                Cursor mCursor = mContentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, null,
                        MediaStore.Images.Media.MIME_TYPE + "= ? or " + MediaStore.Images.Media.MIME_TYPE + "= ?",
                        new String[]{"image/jpeg", "image/png"}, MediaStore.Images.Media.DATE_MODIFIED);

                Set<String> mDirPaths = new HashSet<String>();//防止重复扫描

                while (mCursor.moveToNext()) {
                    String path = mCursor.getString(mCursor.getColumnIndex(MediaStore.Images.Media.DATA));

                    File parentFile = new File(path).getParentFile();
                    if (parentFile == null) {
                        continue;
                    }

                    String dirPath = parentFile.getAbsolutePath();

                    ImgFolderBean imgFolderBean = null;
                    if (mDirPaths.contains(dirPath)) {
                        continue;
                    } else {
                        mDirPaths.add(dirPath);
                        imgFolderBean = new ImgFolderBean();
                        imgFolderBean.setDir(dirPath);
                        imgFolderBean.setFistImgPath(path);
                    }

                    if (parentFile.list() == null) {
                        continue;
                    }

                    int picSize = parentFile.list(new FilenameFilter() {
                        @Override
                        public boolean accept(File file, String fileName) {
                            if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {

                                return true;
                            }
                            return false;
                        }

                    }).length;

                    totalCount += picSize;

                    imgFolderBean.setCount(picSize);
                    mFolderBeen.add(imgFolderBean);

                    if (picSize > mMaxCount) {
                        mMaxCount = picSize;
                        mCurrentDir = parentFile;
                    }
                }


                mHandler.sendEmptyMessage(0x110);
                mCursor.close();

            }
        }).start();


    }

    private void initView() {

        mIv_back = (ImageView) findViewById(R.id.iv_back);
        mTv_done = (TextView) findViewById(R.id.tv_done);
        mGv_photo = (GridView) findViewById(R.id.gv_photo);
        mBottom_layout = (RelativeLayout) findViewById(R.id.id_bottom_ly);
        mBottom_choose_dir = (TextView) findViewById(R.id.id_choose_dir);
        mTv_totalCount = (TextView) findViewById(R.id.id_total_count);
        mTv_title = (TextView) findViewById(R.id.tv_title);
        mBt_preview = (Button) findViewById(R.id.btn_preview);

        mIv_back.setOnClickListener(this);
        mTv_done.setOnClickListener(this);
        mBt_preview.setOnClickListener(this);


    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.tv_done:
                Intent intent = new Intent();
                ArrayList<String> images = (ArrayList<String>) mImageAdapter.getImages();
                intent.putStringArrayListExtra("mImgs", images);
                setResult(RESULT_OK, intent);
                finish();
                break;
            case R.id.btn_preview:
                Intent intent2 = new Intent(this, BigImageActivity.class);
                intent2.putStringArrayListExtra(Const.LIST_FROM_RN, (ArrayList<String>) mImageAdapter.getImages());
                startActivity(intent2);
                break;
        }
    }

}
