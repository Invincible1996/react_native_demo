package com.react_native_demo.photopicker.adapter;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.react_native_demo.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wenqiang on 2017/10/20.
 */

public class ImageAdapter extends BaseAdapter {


    private List<String> mSelectedImg = new ArrayList<>();

    protected LayoutInflater mInflater;
    protected Context mContext;
    protected List<String> mDatas;
    protected String mDirPath;
    protected List<String> mList_from_rn;


    public ImageAdapter(Context context, List<String> datas, List<String> list_from_rn, String dirPath) {

        mContext = context;
        mDatas = datas;
        mInflater = LayoutInflater.from(context);
        mDirPath = dirPath;
        if (list_from_rn !=null){
        mSelectedImg.addAll(list_from_rn);
        }


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

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {


        final String path = mDirPath +"/"+ mDatas.get(position);

        final ViewHolder viewHolder;
        if (convertView == null) {
            convertView = mInflater.inflate(R.layout.item_gridview, parent, false);
            viewHolder = new ViewHolder();
            viewHolder.mImageView = (ImageView) convertView.findViewById(R.id.iv_image);
            viewHolder.mSelect = (ImageView) convertView.findViewById(R.id.iv_select);

            convertView.setTag(viewHolder);

        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }


        Glide.with(mContext).load(path).into(viewHolder.mImageView);

        setImageItem(viewHolder, mSelectedImg.contains(path));

        viewHolder.mImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mSelectedImg.contains(path)) {
                    mSelectedImg.remove(path);
                    setImageItem(viewHolder, false);
                } else {
                    if (mSelectedImg.size() < 9) {
                        mSelectedImg.add(path);
                        if (mList_from_rn != null && mList_from_rn.size() > 0) {
                        }
                        setImageItem(viewHolder, true);
                    } else {
                        Toast.makeText(mContext, "亲，最多选9张哦！！！", Toast.LENGTH_SHORT).show();
                    }

                }
                if (mOnItemSelectNumListener != null) {
                    mOnItemSelectNumListener.onItemSelectNum(mSelectedImg.size());
                }
            }
        });

        return convertView;
    }


    void setImageItem(ViewHolder holder, boolean isSelect) {
        if (isSelect) {
            holder.mSelect.setImageResource(R.mipmap.select);
            holder.mImageView.setColorFilter(Color.parseColor("#77000000"));
        } else {
            holder.mSelect.setImageResource(R.mipmap.unselect);
            holder.mImageView.setColorFilter(null);
        }
    }


    public List<String> getImages() {
        return mSelectedImg;
    }

    private class ViewHolder {
        ImageView mImageView;
        ImageView mSelect;
    }

    OnItemSelectNumListener mOnItemSelectNumListener;

    public interface OnItemSelectNumListener {
        void onItemSelectNum(int size);
    }

    public void setOnItemSelectNumListener(OnItemSelectNumListener onItemSelectNumListener) {
        mOnItemSelectNumListener = onItemSelectNumListener;
    }

    public int setSelectNum() {
        return mSelectedImg.size();
    }


}
