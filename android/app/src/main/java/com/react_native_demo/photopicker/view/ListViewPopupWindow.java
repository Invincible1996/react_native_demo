package com.react_native_demo.photopicker.view;

import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.BitmapDrawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.react_native_demo.R;
import com.react_native_demo.photopicker.bean.ImgFolderBean;

import java.util.List;

/**
 * Created by wenqiang on 2017/11/27.
 */

public class ListViewPopupWindow extends PopupWindow {

    private int mWidth;
    private int mHeight;
    private View mConvertView;
    private ListView mListView;

    private List<ImgFolderBean> mDatas;
    private ListView mLv_pop;
    private ListDirAdapter mAdapter;


    public ListViewPopupWindow(final Context context, List<ImgFolderBean> datas) {
//        super(context);


        mDatas = datas;
        calWidthAndHeight(context);
        mConvertView = LayoutInflater.from(context).inflate(R.layout.popup_main, null);

        setContentView(mConvertView);
        setWidth(mWidth);
        setHeight(mHeight);

        setFocusable(true);
        setTouchable(true);
        setOutsideTouchable(true);
        setBackgroundDrawable(new BitmapDrawable());

        setTouchInterceptor(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent event) {


                if (event.getAction() == MotionEvent.ACTION_OUTSIDE) {
                    dismiss();
                    return true;
                }
                return false;
            }
        });

        initViews(context);
        initEvents();
    }

    private void initViews(Context context) {
        mLv_pop = (ListView) mConvertView.findViewById(R.id.lv_pop);
        if (mAdapter == null) {
            mAdapter = new ListDirAdapter(context, mDatas);
        } else {
            mAdapter.notifyDataSetChanged();
        }
        mLv_pop.setAdapter(mAdapter);
    }


    private void initEvents() {
        mLv_pop.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
                if (mOnPopupItemOnClickLisenter != null) {
                    mOnPopupItemOnClickLisenter.onItemClick(mDatas.get(position));
                }
            }
        });
    }

    public interface OnPopupItemOnClickLisenter {
        void onItemClick(ImgFolderBean imgFolderBean);
    }

    public OnPopupItemOnClickLisenter mOnPopupItemOnClickLisenter;

    public void setOnPopupItemOnClickLisenter(OnPopupItemOnClickLisenter onPopupItemOnClickLisenter) {
        this.mOnPopupItemOnClickLisenter = onPopupItemOnClickLisenter;
    }


    /**
     * 计算popupWindow的宽度和高度
     *
     * @param context
     */
    private void calWidthAndHeight(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        DisplayMetrics displayMetrics = new DisplayMetrics();
        wm.getDefaultDisplay().getMetrics(displayMetrics);

        mWidth = displayMetrics.widthPixels;
        mHeight = (int) (displayMetrics.heightPixels * 0.7);
    }

    private class ListDirAdapter extends BaseAdapter {

        private LayoutInflater mInflater;
        private List<ImgFolderBean> mDatas;

        public ListDirAdapter(Context context, List<ImgFolderBean> objects) {

            mInflater = LayoutInflater.from(context);
            mDatas = objects;
        }

        @Override
        public int getCount() {
            return mDatas.size();
        }

        @Override
        public Object getItem(int position) {
            return mDatas.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @NonNull
        @Override
        public View getView(int positon, @Nullable View convertView, @NonNull ViewGroup parent) {

            ViewHolder holder = null;

            if (convertView == null) {

                holder = new ViewHolder();
                convertView = mInflater.inflate(R.layout.item_popup_main, parent, false);
                holder.mImg = (ImageView) convertView.findViewById(R.id.iv_dir);
                holder.mTv_dir_name = (TextView) convertView.findViewById(R.id.id_dir_item_name);
                holder.mTv_dir_count = (TextView) convertView.findViewById(R.id.id_dir_item_count);
                convertView.setTag(holder);

            } else {

                holder = (ViewHolder) convertView.getTag();

            }


            ImgFolderBean bean = mDatas.get(positon);

            holder.mImg.setImageResource(R.mipmap.pictures_no);

            Glide.with(parent.getContext()).load(bean.getFistImgPath()).into(holder.mImg);
            holder.mTv_dir_name.setText(bean.getName());
            holder.mTv_dir_count.setText(bean.getCount() + "");

            return convertView;
        }

        private class ViewHolder {
            ImageView mImg;
            TextView mTv_dir_name;
            TextView mTv_dir_count;

        }
    }
}
